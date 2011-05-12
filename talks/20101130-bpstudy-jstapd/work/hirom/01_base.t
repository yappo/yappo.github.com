use JSTAPd::Suite;
sub tests { 8 }

sub include {
#    (
#        'your-under-controll-scriptfile.js',
#    );
}

sub include_ex {
    (
        'http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js',
        \'jquery-jstapd.js',
    );
}
