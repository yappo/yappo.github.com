use strict;
use warnings;
use 5.015;
use utf8;

sub call { say((caller(1))[3]) }
sub 北海道 { say('札幌'); call(); }
北海道;

do {
    use utf8;
    my $hokkaido = \&{"北海道"};
    $hokkaido->();
};

do {
    no utf8;
    # utf8 フラグ立ってないのでシンボル名解決出来ない
    my $hokkaido = \&{"北海道"};
    $hokkaido->();
};

