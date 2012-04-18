use strict;
use warnings;
use 5.015;
use Test::More;

our $AUTOLOAD;
sub AUTOLOAD {
    my($key) = $AUTOLOAD =~ /([^:]+)$/;
    return 0 if $a eq $b;
    return -1 if $a eq $key;
    return 1 if $b eq $key;
    return 0;
}

my @list = qw/ foo bar baz /;
my @foo = sort foo @list;
is($foo[0], 'foo');
my @bar = sort bar @list;
is($bar[0], 'bar');
my @baz = sort baz @list;
is($baz[0], 'baz');

done_testing;
