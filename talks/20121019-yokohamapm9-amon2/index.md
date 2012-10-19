10 Amon2 実践 Tips
===

yappo


概要
---

話す事まとまらなかったので、僕の最近作ったアプリを元にダラダラ話します。

perlbrew in project dir
---

依存モジュールの管理は悩ましいですが、プロジェクトの basedir 直下に perlbrew をセットアップして、そこにモジュールをつっこんでおくと、 perl バイナリと依存モジュールとプロジェクトファイルが一元管理出来て楽でした。
結局依存モジュールのバージョン管理もかねる事になるので carton も使わなくて問題無し。

    PERLBREW_ROOT=/home/projects/bokete/perl5 perlbrew init
    

cpanm
---

この perlbrew 環境で捗る cpanm のラッパーをつっこんで使ってる。

    #!/bin/sh
    /home/projects/bokete/perl5/perls/perl-5.16.1/bin/perl /home/projects/bokete/perl5/bin/cpanm $@

plackup
---

開発環境、ステージング環境、本番環境、テスト環境とかで PLACK_ENV を変えたりしてるので、 daemontools の run ファイルを完結にするような感じで簡易なランチャーを作ってる。

基本的に、他のプロジェクトからパクって来たんだけど再利用生高い。

run-psgi
---

run ファイルもこんな感じで書ける。

    #!/bin/sh
    export PLACK_ENV=production
    exec /bin/sh /home/projects/bokete/scripts/run-psgi app.psgi 1914 15

config/batch.pl
---

batch 処理用の場合には production の設定からちょっと変更させる場合もあるので、一部読み込んでちょろっと変更するとかやる。

    use strict;
    use warnings;
    use File::Spec;
    use File::Basename qw(dirname);
    use File::RotateLogs;
    my $basedir = File::Spec->rel2abs(File::Spec->catdir(dirname(__FILE__), '..'));
    my $config = do File::Spec->catfile($basedir, 'config', 'production.pl');
    $config->{DBI_slave} = 'nanntara';
    $config;

ここまでで半分おわり
---

<img src="imgs/neco.jpg" />

batch 用のランチャー
---

batch 処理を起動するときは、諸々環境変数とかをセットアップしておいてくれるランチャー経由で呼び出すと運用がらくだし crontab の呼び出しも安心安全。

    #!/bin/sh
    export PLACK_ENV=batch
    _app_root=$(cd `dirname $0`/.. && pwd -P)
    export PATH=$_app_root/perl5/perls/perl-5.16.1/bin:/usr/local/bin:$PATH
    export PERL5LIB=$_app_root/lib
    exec "$@"

CLI ha bootstrap
---

CLI を書きたいときは context class の bootstrap をよんどけば、良い感じになってる。

    my $c = Bokete->bootstrap;
    $c->dbh->selectall_arrayref(q{SELECT ....

no Amon2::DBI
---

だいたいの業務プロダクトには ORM は不要だけど、そもそも Amon2::DBI とかも使わなくておk
context class に dbh メソッド生やしとけばいいよ

    sub dbh {
        my $self = shift;
        $self->{dbh} //= DBI->connect(@{ $self->config->{DBI} });
    }
    sub dbh_slave {
        my $self = shift;
        return $self->dbh if $self->{FORCE_MASTER};
        return $self->{dbh_slave} //= DBI->connect(@{ $self->config->{DBI_slave} });
    }

logging
---

CLI/Web の差異で悩まずログ取りたいなと思った結果 context class にメソッド生やせばいいと結論になった。

    sub log {
        my($self, $level, $message) = @_;
        $self->{logger} //= File::RotateLogs->new(
            %{ $self->config->{Log}{'File::RotateLogs'} }
        );
        return if $self->config->{Log}{ignore_levels}{$level};
        my ( $sec, $min, $hour, $mday, $mon, $year, $wday, $yday, $isdst ) = localtime(time);
        my $time    = sprintf(
            "%04d-%02d-%02dT%02d:%02d:%02d",
            $year + 1900,
            $mon + 1, $mday, $hour, $min, $sec
        );
        my(undef, $file, $line) = caller(0);
        $self->{logger}->print("[$time] [$$] [$level] $message at $file line $line.\n");
    }

logdir は deploy や config/*.pl の適切なタイミングで mkdir やパーミッション設定をしておくとスケールしやすい。

$c は引き回さない
---

global 変数使わないっていう制約をあえて忘れて、 Amon2->context を使って $c を引き回さないようにする。ちゃんとアプリケーションが boot 

    package Bokete::Data::Odai {
        sub c { Bokete->context }
        sub fetch_random {
           my $class = shift;
           $class->c->dbh->...;
        }
    }

親クラス側に c を生やして敬称して使い回わしてもおk。

*::Web はさっさと奇麗にする
---

つかわないぷらぐいんとかトリガーせっていいっぱいあるので、さっさと奇麗にするが吉

まとめ
---

Amon2 は薄くて安心安全なので、自由に使えば良いけどベストプラクティスをもうちょい共有しよう。

以上です
===


ということでドラクエ10の話です
---
