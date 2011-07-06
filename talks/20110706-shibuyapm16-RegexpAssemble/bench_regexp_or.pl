use strict;
use warnings;
use utf8;

use Regexp::Assemble;
use Benchmark ':all';

print "Perl $^V\n";
print "Regexp::Assemble @{[ $Regexp::Assemble::VERSION ]}\n";

my $text = <<FUKUOKA ;
福岡すげー怖いよ

中洲の丸源ビル付近で 
酔ったサラリーマン２人に 
金属バット持ったチンピラが喧嘩売って 
チンピラ一瞬にしてサラリーマンにマウント取られて 
ボコボコにされてた

福岡県
その後サラリーマンが笑いながら 
チンピラの膝を金属バットでフルスイング！

山梨県
人間の叫び声じゃなかった 
早く東京帰りたい
FUKUOKA

my $ra = Regexp::Assemble->new;
$ra->add($_) for (qw/福岡県 福島県 福井県 山口県 山梨県/);
my $ra_re = $ra->re;

cmpthese(100000, {
    '(||)' => sub {
        my @x = $text =~ /(福岡県|福島県|福井県|山口県|山梨県)/g;
        die unless scalar(@x) == 2;
    },
    '[]' => sub {
        my @x = $text =~ /((?:福[岡島井]|山[口梨])県)/g;
        die unless scalar(@x) == 2;
    },
    'R::A' => sub {
        my @x = $text =~ /$ra_re/g;
        die unless scalar(@x) == 2;
    },
});


