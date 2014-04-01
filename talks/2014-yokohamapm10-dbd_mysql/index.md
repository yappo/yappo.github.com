ひとつ上の DBD::mysql casual
==========

<address>Yappo @ Yokohama.PM #10</address>
<style>
.step h1 {
    font-size: 60px;
    line-height: 1.2em;
    padding-bottom: 15px;
}.step h2 {
    font-size: 50px;
    line-height: 1.1em;
    padding-bottom: 15px;
}.step h3 {
    font-size: 40px;
    line-height: 1.1em;
    padding-bottom: 10px;
}.step code {
    font-family: monospace;
    font-size: 0.5em;
    line-height: 0;
}.step {
    line-height: 0.9;
}
</style>

あらすじ
---

ここ最近 DBD::mysql 使ってパフォーマンスアップ頑張ってたので得られたちょびっとだけの知見を外出します

bit result との戦い
---

通常は

    my $sth = $dbh->prepare(
      'SELECT * FROM okkiinari'
    );
    $sth->execute;

とかしてクエリなげるんですが、 execute 発行した段階でサーバからデータを全て読み込んでしまう。
IOブロック長いしメモリ食いまくる。

普通の実装
---

普通の人はこういう事する。

    my $last_id = 0;
    while (1) {
      my $sth = $dbh->prepare(
        'SELECT * FROM okkiinari WHERE > ? LIMIT 100'
      );
      $sth->execute($last_id);
      while (my $row - $sth->fetchrow_hashref) {}
      last if $sth->rows < 100;
    }

それ mysql_use_result でやってみよう
===

mysql_use_result とは
---

libmysqlclient の C API である。通常 execute を発行すると mysql_store_result という C API を利用してサーバから結果を全部転送してくる。

しかしこのオプションを指定すると execute 発行してから mysqld が結果を返してきたタイミングで execute メソッドが帰ってくる。そして実際のデータ転送は fetch が実行された時になる。

以下のいずれかの指定をすると、これが有効になる。

    my $dbh= DBI->connect('DBI:mysql:test;mysql_use_result=1', 'root', '');
    $dbh->{mysql_use_result}=1; 
    $sth->{mysql_use_result} = 1;
    $sth->prepare($sql, { mysql_use_result => 1 });

mysql_use_result 注意1
---

     $sth->rows;

して結果行を得ようとしても0が戻ります。

mysql_use_result 注意2
---

全レコードを取得するまで若しくは $sth->finish するまでは READ LOCK がかかってる状態っぽい事が mysql の C API ドキュメントに書いてあったんですが、再現しませんでした。

mysql_use_result 注意3
---

このオプションさえ使えばあとは何も気にしなくて良いのですが id:sh2 さんから「mysql_use_resultしてもサーバの挙動自体は変わらなくて、クライアントへのネットワークが細くて通信を待たされているような状態です。クライアントがもたもたしているとNET_READ_TIMEOUT(デフォルト30秒)で切断されるので注意」とアドバイスを貰いました。

でも
---

検証コードで以下の感じでやってみたけど普通に fetch できて良くわからない！

    my $sth = $dbh->prepare('SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5', { mysql_use_result => 1 });
    $sth->execute;
    sleep 65;
    while (my $row = $sth->fetchrow_arrayref) {
      sleep 65;
      printf "%d: %s\n", time(), $row->[0];
    }

mysql_use_result 注意4
---

次に紹介する機能と併用できません。
コード見た感じ併用するパッチ書いたら出来そうなんだよね。使わないからパッチ書かないけど。

重いクエリを実行中の後ろで別の処理を行いたい！
---

バッチ処理とか管理画面を実装する時に、集計スクリプト等でわりと重いクエリを発行する事があると思います(もちろんバッチ用のスレーブで)。
さらに別の重たい処理をしたいなんて事があるんじゃないでしょうか。複数の重いクエリでも良いけど。

それ async API で
---

最近の DBD::mysql では　async オプションが追加されています。
このオプションを使うと execute して mysqld にクエリを投げたあとは結果を待たずに戻ってきます。 mysql_use_result は *結果が出来るのを待ってから、データ転送はしない* という微妙な差異があります。

使い方
---

AnyEvent で使ってもいいですが、わりとパフォーマンス悪いので IO::Select とか使うといいです。 execute した後に fetch するタイミングがわからなくなりそうですが、 mysqld_fd っていうメソッドが socket の fd を返してくれるのでそれを使います。

code
---

    my $sth1 = $dbh1->prepare('SELECT 1', { async => 1 });
    my $sth2 = $dbh2->prepare('SELECT 1', { async => 1 });
    $sth1->execute; $sth2->execute;
    my $select = IO::Select->new(
      $dbh1->mysql_fd, $dbh2->mysql_fd,
    );
    while ($select->count) {
      my @fd = $select->can_read;
      $select->remove(@fd);
    }
    while (my $row = $sth1->fetchrow_arrayref) {}
    while (my $row = $sth2->fetchrow_arrayref) {}

notice1
---

* DBD::mysql 独自の実装
* server side prepared statement は使えない
* 最初に fetch したタイミングでサーバからデータを全部読み込む( mysql_use_result を使ってない併用できない)
* readable になるのを待たずに fetch したら block してデータを全部読み込む

notice2
---

* 一度も fetch しなかったり $sth->finish しない状態では commit rollback できなくて、新規クエリも投げられない
* mysql_async_ready もあるけど内部的に timeout 指定出来ない  poll(&fds, 1, 0) 呼んで速戻るだけなので使っても busy loop になるだけ
* mysql_async_result というメソッドも提供されているけど、結果の行数返すだけだしそもそも fetch 呼んだ時に内部的に呼ばれるので使う意味ない

大事なこと
---

サーバからのデータの転送は非同期じゃないんです。あくまでもクエリの処理が終わるまでの間の時間しか待てないから使いどころ少ない！

それでもデータの転送を非同期にしたい！
===

実は既存のユースケースでも何となく出来ます
---

    my $sth = $dbh->prepare($sql, { mysql_use_result => 1 }); $sth-->execute;
    while (1) {
      while (1) {
        my $ret = IO::Select-->new($dbh-->mysql_fd)-->can_read(0);
        last if $ret;
          ...; # read 出来るまでの間にやっときたいこと
      }
      my $row = $sth-->fetchrow_hashref;
      last unless $row;
      ...; # 通常の行処理
    }

どういう事かっていうと
---

libmysqlclient の内部的に fetch_row を呼んだ時に、サーバからデータを受け取るのに cli_safe_read を使っていて受け取ったパケット(mysql的な意味で)が MAX_PACKET_LENGTH と一致するまで延々と block して read するんですが、たまに MAX_PACKET_LENGTH 未満のデータを受け取った時に fetch_row まで落ちてきて fetchrow_hashref とかが帰ってくるので、そのタイミングで readable になってなければ script でなんか処理してしまおうって作戦。

mysql_use_result の時だけ使える売るテク。基本的に稀です。

簡単な原理でした
---

ここまで前座次が本編

Localizer
==========

<address>Yappo @ Yokohama.PM #10</address>

時間切れです
---

tokuhirom が今作ってる他言語処理モジュール。有名なあれはコードが読みづらくていざ困った時に辛いからわかりやすいコードで実装されてて使いやすいよ！

以上です
===




