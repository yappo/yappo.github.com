use common::sense;
use Data::Dumper;
use pQuery;

say join "\n",
    pQuery('http://atnd.org/events/9721')->find('.header_cap')->text
;
