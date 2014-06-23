package DDG::Spice::Steam::ListSpecials;
# ABSTRACT: Fetch the Steam Special Details

use DDG::Spice;
use JSON::XS;

attribution github => ["https://github.com/killerfish", "Usman Raza"],
            twitter => ["https://twitter.com/f1shie", "Usman Raza"];

spice to => 'http://store.steampowered.com/api/appdetails?appids=$1';

triggers any => "///***never trigger***///";

spice wrap_jsonp_callback => 1;

my ($decoded, $idmap);

handle remainder => sub {
        return;
};

1;
