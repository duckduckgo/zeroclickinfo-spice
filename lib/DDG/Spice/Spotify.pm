package DDG::Spice::Spotify;

# ABSTRACT: Music search on Spotify

use strict;
use DDG::Spice;

spice is_cached => 0;
spice proxy_cache_valid => "200 1d";
spice wrap_jsonp_callback => 1;

spice to => 'https://api.spotify.com/v1/search?q=$1&market=$2&limit=35&type=track';
spice from => '(.*)/(.*)';

triggers end => 'on spotify';

handle remainder => sub {
    return unless $_  and $loc and $loc->country_code;
    return $_, $loc->country_code;
};

1;