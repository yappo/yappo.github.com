# JSTAPd config
my $config = {
    jstapd_prefix => '____jstapd',
    apiurl        => qr{^/(?!____jstapd(?:__api))},
#    apiurl        => qr{^/(?!____jstapd(?:__api)|jslib/)},
};
#$config->{urlmap} = [
#    { qr!^/jslib/! => '../jslib/' },
#];

# browser auto open
# for run_once mode (prove -vl foo.t or prove -vlr jstap/)
# this example for Mac OS X
# $config->{auto_open_command} = 'open -g -a Safari %s';
# or $ENV{JSTAP_AUTO_OPEN_COMMAND} = 'open -g -a Safari %s';

$config;
