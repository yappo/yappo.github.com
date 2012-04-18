use strict;
use warnings;
use 5.015;
use utf8;
use Test::More;

...;

use Data::Dumper;
warn Dumper(fc('Ａ'));
warn Dumper(fc('Ḁ'));
ok(fc('Ａ') eq fc('a'));

done_testing;
