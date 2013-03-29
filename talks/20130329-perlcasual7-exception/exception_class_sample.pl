use strict;
use warnings;
use 5.014;

package Exception {
    sub throw {
        my($class, $message) = @_;
        die bless \$message, $class;
    };
    sub message { ${ $_[0] } . ' or die!' }
};

eval {
    Exception->throw('10msec');
};
say $@->message if $@;
