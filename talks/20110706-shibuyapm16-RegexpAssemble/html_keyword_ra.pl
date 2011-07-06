use strict;
use warnings;

use Regexp::Assemble;

open my $fh, '<', '/usr/share/dict/words';

my %count;
my @words = grep { 
    my($first) = $_ =~ /^(.)/;
    $count{$first}++ < 2 ? 1 : 0;
} reverse map { chomp; lc $_ } <$fh>;

my $text = (join ', ', @words);

my $ra = Regexp::Assemble->new;
for (@words) {
    $ra->add($_);
}
my $ra_re = $ra->re;

my $html = $text;
$html =~ s{($ra_re)}{<SPAN class="keyword">$1</SPAN>}g;

print "$html\n";

my $expected = <DATA>;
chomp $expected;

print $html eq $expected ? "ok\n" : "error\n";

__DATA__
<SPAN class="keyword">zyzzogeton</SPAN>, <SPAN class="keyword">zyzomys</SPAN>, <SPAN class="keyword">yvonne</SPAN>, <SPAN class="keyword">yuzluk</SPAN>, <SPAN class="keyword">xystus</SPAN>, <SPAN class="keyword">xystum</SPAN>, <SPAN class="keyword">wyver</SPAN>, <SPAN class="keyword">wyve</SPAN>, <SPAN class="keyword">vyingly</SPAN>, <SPAN class="keyword">vying</SPAN>, <SPAN class="keyword">uzbek</SPAN>, <SPAN class="keyword">uzbeg</SPAN>, <SPAN class="keyword">tzutuhil</SPAN>, <SPAN class="keyword">tzotzil</SPAN>, <SPAN class="keyword">szopelka</SPAN>, <SPAN class="keyword">szlachta</SPAN>, <SPAN class="keyword">ryukyu</SPAN>, <SPAN class="keyword">rytina</SPAN>, <SPAN class="keyword">qurti</SPAN>, <SPAN class="keyword">quotum</SPAN>, <SPAN class="keyword">pyxis</SPAN>, <SPAN class="keyword">pyxis</SPAN>, <SPAN class="keyword">ozotype</SPAN>, <SPAN class="keyword">ozostomia</SPAN>, <SPAN class="keyword">nyxis</SPAN>, <SPAN class="keyword">nystagmus</SPAN>, <SPAN class="keyword">myzostomous</SPAN>, <SPAN class="keyword">myzostomidan</SPAN>, <SPAN class="keyword">lyxose</SPAN>, <SPAN class="keyword">lytta</SPAN>, <SPAN class="keyword">kyurinish</SPAN>, <SPAN class="keyword">kyurin</SPAN>, <SPAN class="keyword">jynx</SPAN>, <SPAN class="keyword">jynx</SPAN>, <SPAN class="keyword">izzard</SPAN>, <SPAN class="keyword">iztle</SPAN>, <SPAN class="keyword">hystrix</SPAN>, <SPAN class="keyword">hystricomorphous</SPAN>, <SPAN class="keyword">gyve</SPAN>, <SPAN class="keyword">gytling</SPAN>, <SPAN class="keyword">fyrd</SPAN>, <SPAN class="keyword">fylfot</SPAN>, <SPAN class="keyword">ezra</SPAN>, <SPAN class="keyword">ezekiel</SPAN>, <SPAN class="keyword">dzungar</SPAN>, <SPAN class="keyword">dzeren</SPAN>, <SPAN class="keyword">czechoslovakian</SPAN>, <SPAN class="keyword">czechoslovak</SPAN>, <SPAN class="keyword">byzantinize</SPAN>, <SPAN class="keyword">byzantinism</SPAN>, <SPAN class="keyword">azymous</SPAN>, <SPAN class="keyword">azymite</SPAN>
