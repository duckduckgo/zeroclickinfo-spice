package DDG::Spice::Twitter;

use DDG::Spice;

spice to => 'https://jagtalon.duckduckgo.com/tw.js?user=$1&callback={{callback}}&current=1';
spice is_cached => 1;

triggers query => qr/^twitter\s([a-z0-9_]+)$|^@([a-z0-9_]+)$/i;

handle matches => sub { 
    if($1) {
        return $1;
    } elsif($2) {
        return $2;
    }

    return;
};

1;
