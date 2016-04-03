package DDG::Spice::Maps::Maps;
# ABSTRACT: Map of current cocation

use strict;
use DDG::Spice;

spice to => 'http://api.mapbox.com/v4/geocode/mapbox.places/$1.json?access_token={{ENV{DDG_SPICE_MAPBOX_KEY}}}';
spice is_cached => 0;
spice proxy_cache_valid => "418 1d";
spice wrap_jsonp_callback => 1;

triggers startend => "map of", "map", "maps", "current location", "directions to";

handle remainder => sub {
    return $_ if $_;

    my $location = $loc->loc_str;
    return $location if $location;

    return;
};

1;

