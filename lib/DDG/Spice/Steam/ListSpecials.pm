package DDG::Spice::Steam::ListSpecials;
# ABSTRACT: Fetch the Steam Special Details

use DDG::Spice;

attribution github => ["https://github.com/killerfish", "Usman Raza"],
            twitter => ["https://twitter.com/f1shie", "Usman Raza"];

spice to => 'http://store.steampowered.com/api/appdetails?appids=$1';

triggers any => "///***never trigger***///";

spice wrap_jsonp_callback => 1;

handle remainder => sub {
        return $_ if $_;
	return;
};

1;
