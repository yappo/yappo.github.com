use strict;
use warnings;
use 5.015;

my $foo = sub {
    @_ ? say(@_) : __SUB__;
};
$foo->()->('bar');
