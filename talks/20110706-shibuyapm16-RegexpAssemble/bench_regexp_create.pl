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

cmpthese(40, {
    'Assemble' => sub {
        my $ra = Regexp::Assemble->new;
        for (@words) {
            $ra->add($_);
        }
        my $re = $ra->re;
    },

    'Assemble::Compressed' => sub {
        my $ra = Regexp::Assemble::Compressed->new;
        for (@words) {
            $ra->add($_);
        }
        my $re = $ra->re;
    },

    'Trie' => sub {
        my $rt = Regexp::Trie->new;
        for (@words) {
            $rt->add($_);
        }
        my $re = $rt->regexp;
    },

});
