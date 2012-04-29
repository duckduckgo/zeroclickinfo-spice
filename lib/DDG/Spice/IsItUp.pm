package DDG::Spice::IsItUp;

use DDG::Spice;

spice is_cached => 0;

triggers query_lc => qr/^(:?is\s)?([a-z0-9\-\.]+\.[a-z]{2,4})(:?\s(up|down)\s*(:?\?)?)?$/;

spice to => 'http://isitup.org/$1.json';

handle matches => sub {
    if ($1 && $2 && $3) {
        return $2;
    } elsif ($2 && $3) {
        return $2;
    }
    return;
};

1;
