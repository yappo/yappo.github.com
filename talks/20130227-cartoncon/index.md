carton in amon2-livedoor-setup.pl
==========

<address>Yappo</address>

基本
---

ちょいちょい新規アプリを作る事が多いので Amon2 を使った雛形アプリを簡単に作れるスクリプト書いてた。
社内の仕様に特化した設定や、社内ライブラリ、デプロイツールなどが一発で入る君。

作り始めだから、特定の種類のアプリケーションに特化させてた。

使ってる環境
---

carton 0.9.10
cpanm 1.6000

古い carton 使ってる人と仕事するとき
---

    in Makefile.PL

    my $file = Module::CPANfile->load("cpanfile");
    $file->merge_meta('MYMETA.json');
    $file->merge_meta('MYMETA.yml');

before
---

carton 今いちわからないし、使ってる人 ikasama さんくらいしか居ないしで単純な対応してた。

setup script 叩いたら

    export PERLBREW_ROOT=/home/user/[% appname %]
    export PERLBREW_HOME=/home/user/[% appname %]
    perlbrew install perl-5.16.2

して perl 作って、プロダクトのリポジトリに丸ごといれてね！ってやってた。

良い所
---

* 何でも感でも /home/user/[% appname %]/perl5 の中にインストールされて全部リポジトリ管理されるので、バージョン固定とか気にしなくても固定される
* git clone しただけで動作可能になる


悪い所
---

* 沢山のプロジェクトでこの手法やってたらもったいないお化けでてくる(凝った画像使ったサイトだったら、そっちのが容量食うけど)
* 初回の git clone だるい

思い直した
---

* いかさまさんに「別に carton 使って捗る事ないから、全部リポジトリぶっ込めばいいじゃん」とか言ってたけど carton が汎用性感でてきたから使ってみる事にした
* 依存ライブラリがちゃんと管理出来てれば手法とかどうでもいいんだけど、やっぱりリポジトリの中にプロジェクトの関連度が低いの入ってるのよく無い感もあった
* 社内で使いだしてて、やっと実践のしかた知ったというのもデカイ

言われた
---

* 雛形作って最初に carton install するとき、毎回ネットワークから落とすの遅くなるからどうにかして！
* そうだ！ bundle 作ってつっこんどけばいいんだ！

セットアップツールで使う bundle 作り
---

* amon2-livedoor-setup.pl に cpanfile を出力するようにテンプレしこむ
* perl amon2-livedoor-setup.pl Gfx として適当なプロジェクトを作る
* cd gfx; carton install; carton bundle; ってやって、 local/cache が出来るまでひたすらまつ
* そのままだと cache/local/modules/02packages.details.txt.gz が出来てなくて、悲しくなる

悲しさを乗り越える
---

* gzip .carton/02packages.details.txt; mkdir local/cache/modules; mv .carton/02packages.details.txt local/cache/modules
* ここで出来上がった物を local/cache ディレクトリを amon2-livedoor-setup.pl のリポジトリの中に dependence-libs とかいうディレクトリにしておいとく

セットアップツールで bundle 使う
---

セットアップツールの処理の最後らへんに

    !system "mkdir local" or die $?;
    !system "ln -s $FindBin::Bin/dependent-libs local/cache" or die $?;
    !system "perl -e 'print qq{\n} while (1)' | carton install --cached" or die $?;
    !system "rm local/cache" or die $?;

とかすると、セットアップツールの中の bundle 達からインストールしてくれる。

感想
---

ダウンロード速度よりもなんかインストール自体に時間かかってね?

開発環境での carton
---

簡単です！

* git clone する
* cd する
* carton install する

以上！

CI での carton
---

* ukigumo ようのディレクトリで ~/.ukigumo/[% appname %] を掘る
* そこにプロジェクトを git clone or pull
* carton install する。なんか carton.lock が更新されるので git checkout carton.lock する
* あとは prove -r t &> $tmp

.proverc
---

    "--exec=carton exec -Ilib -I. -- perl -Mlib::core::only"
    -Pretty
    --color
    -v

prove plugin
---

prove plugin で使ってるモジュールは carton 配下のみに入れてると起動失敗するので、 global のとこに cpanm App::Prove::Plugin::Pretty とか入れてる。

デプロイする時の carton
---

* deploy はだいたいのケースで rsync やってる
* rsync する元のファイル構造を /foo/bar/deploy_base/projname みたいな所に git clone しといて、次の deploy からは、そこで pull & submodule update してく
* 毎回 carton install するけど、なんか carton.lock が更新されるから毎回 git checkout carton.lock して無かった事にしてる

rsync
---

あとは普通に

    rsync -a --delete --exclude=META.yml --exclude=MYMETA.json --exclude=MYMETA.yml --exclude=carton.lock --exclude=.carton /foo/bar/deploy_base/projname tohost:/dokka/no/dir

とかして配布する

その他のスクリプト起動
---

基本的に carton は使わないで

    #!/bin/sh
    export PLACK_ENV=production
    export PERL5LIB=$PROJECT_ROOT/local/lib/perl5:$PROJECT_ROOT/lib
    export PERL5OPT="-Mlib::core::only -Mlib=$PROJECT_ROOT/lib -Mlib=$PROJECT_ROOT/local/lib/perl5"
    PROJECT_ROOT=$(cd `dirname $0`/.. && pwd -P)
    exec "$@"

みたいな環境変数をセットしてくれるラッパースクリプトかましてる。

まとめ
---

とくにない

以上です
===
