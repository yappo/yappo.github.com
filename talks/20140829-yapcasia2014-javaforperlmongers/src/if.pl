use strict;
use warnings;
sub true { 1 }sub false {0}
my $booleanValue; sub booleanValue:lvalue { $booleanValue }
my $msg; sub msg:lvalue { $msg }
sub System { '1' }; sub out { '2' }; sub println { print "$_[0]\n"; '3' }
sub throw ($) {}

booleanValue = true;
if (booleanValue) {
    msg = new String("it be success");
    System.out.println(msg);
} else {
    throw new FailException();
}

sub String::new { return $_[1] }
sub FailException::new { die shift }


