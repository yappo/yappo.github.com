ついに顕在化しはじめた Exception リスク
==========

<address>Yappo</address>

あらすじ
---

英語圏ではかなり前から die && $@ で開発し続けることのリスクについて語られていたが、いよいよ具体的な弊害が出て来ているようなので、かいつまんで LT 。日本でもそう遠くない未来だと思う。
<img src="sfujiwara.gif" style="position:fixed top: 100px, left: 100px" />

simpe die
---

    eval {
        die '50 msec!';
    };
    if ($@ && $@ =~ /^50 msec!/) {
        say 'FreeeeeeeeeeeeeeeeeeakOut!';
    }

<img src="sfujiwara.gif" style="position:fixed top: 100px, left: 100px" />

exception class
---

アプリケーションの規模が大きくなってくると、単純な文字列をみて例外処理をするのがめんどくさくなってきます。
実は die の引き数はどんな値でも渡せて、 $@ はどんな物でも入ります。
普通の変数と一緒なのです。

という事は例外を処理するクラスを作って、例外を受けた時に処理すると捗るはず！

<img src="sfujiwara.gif" style="position:fixed top: 100px, left: 100px" />

exception class sample
---

    use strict;use warnings;use 5.014;
    package Exception {
        sub throw {
            my($class, $message) = @_;
            die bless \$message, $class;
        };
        sub message { ${ $_[0] } . ' or die!' }
    };
    eval {
        Exception->throw('10msec');
    };
    say $@->message if $@;


<img src="sfujiwara.gif" style="position:fixed top: 100px, left: 100px" />
CPAN ので作りたい
---

Exception::Class ってのが有名ですが、<a target="_blank" href="https://metacpan.org/source/DROLSKY/Exception-Class-1.37/lib/Exception/Class.pm">ソースコード</a>よむのたいへん。。。

<img src="sfujiwara.gif" style="position:fixed top: 100px, left: 100px" />

Exception::Tiny
---

そこで作った！おれ！カジュアルに！もじゅーる！たいにー！
<a target="_blank" href="https://metacpan.org/source/YAPPO/Exception-Tiny-v0.2.1/lib/Exception/Tiny.pm">ソースコード</a>レベルで、初心者の人でも何やってるかわかるように書いてるから安心安全。

使い方は、良くあるやつと同じ感じですね！

<img src="sfujiwara.gif" style="position:fixed top: 100px, left: 100px" />

sample
---

    package MyException;
    use parent 'Exception::Tiny';
    package main;
    # try
    eval {
        MyException->throw( 'oops!' ); # same MyException->throw( message => 'oops!' );
    };

<img src="sfujiwara.gif" style="position:fixed top: 100px, left: 100px" />

caught
---

基本的には IO Error とか Network Error とか、エラーの種類に応じたクラスを作って行って、エラーの種類は $@ の中身を見て判断する事になります。
一般的な言語では

    try {
    } catch (IOError e) {
    } catch (50MSecError e) {
    }

などのように簡単に処理出来るけど(実はPerlでもできるが後述)、 Perl っぽくかくのを支援室する形で caught てメソッドあります。

<img src="sfujiwara.gif" style="position:fixed top: 100px, left: 100px" />

sample
---

    if (my $e = $@) {
        if (MyException->caught($e)) {
        } elsif (OrDieException->caught($e)) {
        }
    }

<img src="sfujiwara.gif" style="position:fixed top: 100px, left: 100px" />

FAQ
---

Q. throwf($format, ...) みたいな pull-req 採用してほしい
A. Exception::Tiny では、本当に必要な機能だけしかもたずに、ユーザの細かいニーズは Exception::Tiny を継承したユーザ側の基礎の例外クラスで実装してほしいと思っています。
なので、 @Your::Proj::ISA = 'Exception::Tiny' してる Your::Proj の中に便利メソッドをいっぱい早して捗って下さい。あくまでも例外クラス作成のお手伝いだけをするのです。

<img src="sfujiwara.gif" style="position:fixed top: 100px, left: 100px" />

ここまでのまとめ
---

例外処理クラスを作って処理すると、例外出したり例外のハンドリングが楽になります。

<img src="sfujiwara.gif" style="position:fixed top: 100px, left: 100px" />

出してばっかだけど、受け取りどーすんの！？
===

<img src="sfujiwara.gif" style="position:fixed top: 100px, left: 100px" />

はい
---

CPAN には try catch を処理するモジュールもいっぱいありますね。

TryCatch.pm
---

    try {
        die Some::Class->new(code => 404 );
    } catch (Some::Class $e) {
    }

みたいにモダンに書ける。。。！しかし<a target="_blank" href="https://metacpan.org/source/ASH/TryCatch-1.003002/Makefile.PL">依存関係をみると</a>、、Moose, B::Hooks::EndOfScop, Devel::Declare, お、、、おう。。。カジュアルじゃない。。。！

Try::Tiny
---

    try {
        die "foo";
    } catch {
        warn "caught error: $_"; # not $@
    };

わりとシンプル！一般的に良くつかわれてる。

<img src="sfujiwara.gif" style="position:fixed top: 100px, left: 100px" />

とある知り合いの映画に出たいハッカーが
---

「特に受け取りたくない種類の例外だったら、宣言しなくても勝手に rethrow してほしい、 auto rethrow しないと例外キャッチするだけして処理しなくてバグるし、だるいめんどい、オフィス暑い〜○い〜もうおれはだめだ〜」みたいなこといってたので、丁度 exception 期の僕はカジュアルにモジュール作ったんですね。

<img src="sfujiwara.gif" style="position:fixed top: 100px, left: 100px" />

Try::Lite
---

<a target="_blank" href="https://metacpan.org/module/Try::Lite">readmeみながら解説する</a>

<img src="sfujiwara.gif" style="position:fixed top: 100px, left: 100px" />

なぜ try catch なモジュールを使うのか?
---

以外と $@ の扱いは難しくて面倒なのです。

例外処理中に例外発生したら？

例外発生した直後に DESTROY のなかで eval してるオブジェクトがあったら？

<a target="_black" href="http://blog.endpoint.com/2010/07/localize-in-destroy.html">こういうまとめもあった</a>けど、とにかく面倒ごとを良い感じにやるソリューションを素直に使ったほうがいいです。try-catch系モジュールは $@ をうまい具合に保存して元に戻してくれるって安心設計になっていて面倒ごとを隠蔽します。

<img src="sfujiwara.gif" style="position:fixed top: 100px, left: 100px" />

まとめ
---

ついに顕在化し始めた exception 処理に対するリスクヘッジソリューションとして Exception::Tiny と Try::Lite の紹介をしました。

<img src="sfujiwara.gif" style="position:fixed top: 100px, left: 100px" />

以上です
===

<img src="sfujiwara.gif" style="position:fixed top: 100px, left: 100px" />