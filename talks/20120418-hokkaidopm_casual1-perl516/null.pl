use strict;
use warnings;
use 5.015;

sub foo {
    say('bar');
}

main->foo;
my $baz = "foo\0hoge";
{
    no strict 'refs';
    *{$baz} = sub { say($baz) };
}
main->$baz;


