package DDG::Spice::IsItUp;

use DDG::Spice;

spice is_cached => 0;

triggers query_lc => qr/^(:?is\s)?([a-z0-9\-\.]+(:?\.[a-z]{2,4})?)(:?\s(up|down|working)\s*(:?\?)?)?$/;

spice to => 'http://isitup.org/$1.json?callback={{callback}}';

handle matches => sub {
    if ($1 && $2 && $4) {
        return $2;
    } elsif ($2 && $4) {
        if ($2 =~ /.com$/) {
            return $2;
        } else {
            return $2 . '.com';
        }
    }
    return;
};

1;
