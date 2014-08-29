my @list = map { warn "2: $_"; $_ } map { warn "1: $_"; $_ } 1..10;
