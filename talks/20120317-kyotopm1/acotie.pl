use strict;
use warnings;
use 5.015;

sub yappo {
    'yappo';
}

sub nekokak {
    'nekokak';
}

sub nagayama {
    'nagayama';
}

# 先に関数の定義を全部済ませてからロードさせること
use Acme::Acotie;

say yappo;

