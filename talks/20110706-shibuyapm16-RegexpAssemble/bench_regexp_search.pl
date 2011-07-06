use strict;
use warnings;

use Regexp::Assemble;
use Regexp::Assemble::Compressed;
use Regexp::Trie;
use Benchmark ':all';

open my $fh, '<', '/usr/share/dict/words';

my %count;
my @words = grep { 
    my($first) = $_ =~ /^(.)/;
    $count{$first}++ < 10 ? 1 : 0;
} reverse map { chomp; lc $_ } <$fh>;

my $text = (join ' , ', @words) x 10;

my $rt = Regexp::Trie->new;
my $ra = Regexp::Assemble->new;
my $rc = Regexp::Assemble::Compressed->new;
for (@words) {
    $ra->add($_);
    $rc->add($_);
    $rt->add($_);
}
my $ra_re = $ra->re;
my $rc_re = $rc->re;
my $rt_re = $rt->regexp;

cmpthese(300000, {
    'Assemble' => sub {
        $text =~ $ra_re;
    },

    'Assemble::Compressed' => sub {
        $text =~ $rc_re;
    },

    'Trie' => sub {
        $text =~ $rt_re;
    },

});
