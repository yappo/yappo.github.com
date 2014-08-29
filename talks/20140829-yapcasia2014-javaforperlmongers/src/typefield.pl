use strict;
use warnings;
use 5.018;

BEGIN {
    package Foo {
        our %FIELDS = (
            foo => 1,
            bar => 2,
            _Foo_private => 3,
        );
        bless \%FIELDS, 'pseudohash';
    }
}

my Foo $foo = +{};
$foo->{foo}  = 'foo';
say($foo->{foo});      # ここで print されない
#$foo->{hoge} = 'hoge'; # コンパイル時エラー
# No such class field "hoge" in variable
#  $foo of type Foo at ./typefield.pl line 19.

use Devel::Peek;
Dump($foo);
my $foo2 = $foo;
Dump($foo2);

my $foo3 = { foo => {} };
my Foo $foo3_foo = $foo3->{foo};
$foo3->{foo}->{aa} = '111';

#my $foo3 = {};
#Foo $foo3->{foo} = {};
