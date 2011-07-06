use strict;
use warnings;

use Regexp::Assemble;

use Groonga;
use Groonga::Constants;
use Groonga::PatriciaTrie;

package Groonga::PatriciaTrie {
    sub tag_keys {
        my($self, $text, $callback) = @_;
        my $result = '';
        my $position = 0;

        $self->scan($text, sub {
            my($record, $word, $offset, $length, $record_id) = @_;
            if ($position < $offset) {
                $result .= substr $text, $position, $offset - $position;
            }
            $result .= $callback->($record, $word, $record_id) // '';
            $position = $offset + $length;
        });
        $result .= substr $text, $position, length $text;
        $result;
    }
};

use Benchmark ':all';

my $max_words = $ARGV[0] || 10;

my $data = join '', <DATA>;
my($text, $expected) = split /\n/, $data;

# setup keyword
open my $fh, '<', '/usr/share/dict/words';
my %count;
my @words = grep { 
    my($first) = $_ =~ /^(.)/;
    $count{$first}++ < $max_words ? 1 : 0;
} reverse map { chomp; lc $_ } <$fh>;

# Regexp::Assemble setup
my $ra = Regexp::Assemble->new;
my $c = 0;
for (@words) {
    $ra->add($_);
    $c++;
}
print "$c words.\n";
print length($text) . " bytes text.\n";
my $ra_re = $ra->re;

# Groonga setup
my $path = 'groonga_tag_keys.db';
`rm $path` if -f $path;
my $pat = Groonga::PatriciaTrie->new;
if (! $pat->open($path)) {
    $pat->create($path, 1024, 1024, GRN_OBJ_KEY_VAR_SIZE | GRN_OBJ_KEY_NORMALIZE)
        or die 'Groonga::PatriciaTrie create error';
}
for (@words) {
    $pat->add($_, '');
}

warn 'setup finish';

cmpthese(10000, {
    'Regexp::Assemble' => sub {
        my $html = $text;
        $html =~ s{($ra_re)}{<SPAN class="keyword">$1</SPAN>}g;
    },

    'Groonga' => sub {
        my $html = $pat->tag_keys($text, sub {
            my($record, $word, $record_id) = @_;
            '<SPAN class="keyword">' . $record . '</SPAN>';
        });
    },

});

__DATA__
zyzzogeton, zyzomys, yvonne, yuzluk, xystus, xystum, wyver, wyve, vyingly, vying, uzbek, uzbeg, tzutuhil, tzotzil, szopelka, szlachta, ryukyu, rytina, qurti, quotum, pyxis, pyxis, ozotype, ozostomia, nyxis, nystagmus, myzostomous, myzostomidan, lyxose, lytta, kyurinish, kyurin, jynx, jynx, izzard, iztle, hystrix, hystricomorphous, gyve, gytling, fyrd, fylfot, ezra, ezekiel, dzungar, dzeren, czechoslovakian, czechoslovak, byzantinize, byzantinism, azymous, azymite
<SPAN class="keyword">zyzzogeton</SPAN>, <SPAN class="keyword">zyzomys</SPAN>, <SPAN class="keyword">yvonne</SPAN>, <SPAN class="keyword">yuzluk</SPAN>, <SPAN class="keyword">xystus</SPAN>, <SPAN class="keyword">xystum</SPAN>, <SPAN class="keyword">wyver</SPAN>, <SPAN class="keyword">wyve</SPAN>, <SPAN class="keyword">vyingly</SPAN>, <SPAN class="keyword">vying</SPAN>, <SPAN class="keyword">uzbek</SPAN>, <SPAN class="keyword">uzbeg</SPAN>, <SPAN class="keyword">tzutuhil</SPAN>, <SPAN class="keyword">tzotzil</SPAN>, <SPAN class="keyword">szopelka</SPAN>, <SPAN class="keyword">szlachta</SPAN>, <SPAN class="keyword">ryukyu</SPAN>, <SPAN class="keyword">rytina</SPAN>, <SPAN class="keyword">qurti</SPAN>, <SPAN class="keyword">quotum</SPAN>, <SPAN class="keyword">pyxis</SPAN>, <SPAN class="keyword">pyxis</SPAN>, <SPAN class="keyword">ozotype</SPAN>, <SPAN class="keyword">ozostomia</SPAN>, <SPAN class="keyword">nyxis</SPAN>, <SPAN class="keyword">nystagmus</SPAN>, <SPAN class="keyword">myzostomous</SPAN>, <SPAN class="keyword">myzostomidan</SPAN>, <SPAN class="keyword">lyxose</SPAN>, <SPAN class="keyword">lytta</SPAN>, <SPAN class="keyword">kyurinish</SPAN>, <SPAN class="keyword">kyurin</SPAN>, <SPAN class="keyword">jynx</SPAN>, <SPAN class="keyword">jynx</SPAN>, <SPAN class="keyword">izzard</SPAN>, <SPAN class="keyword">iztle</SPAN>, <SPAN class="keyword">hystrix</SPAN>, <SPAN class="keyword">hystricomorphous</SPAN>, <SPAN class="keyword">gyve</SPAN>, <SPAN class="keyword">gytling</SPAN>, <SPAN class="keyword">fyrd</SPAN>, <SPAN class="keyword">fylfot</SPAN>, <SPAN class="keyword">ezra</SPAN>, <SPAN class="keyword">ezekiel</SPAN>, <SPAN class="keyword">dzungar</SPAN>, <SPAN class="keyword">dzeren</SPAN>, <SPAN class="keyword">czechoslovakian</SPAN>, <SPAN class="keyword">czechoslovak</SPAN>, <SPAN class="keyword">byzantinize</SPAN>, <SPAN class="keyword">byzantinism</SPAN>, <SPAN class="keyword">azymous</SPAN>, <SPAN class="keyword">azymite</SPAN>
