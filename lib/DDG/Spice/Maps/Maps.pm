package DDG::Spice::Maps::Maps;
# ABSTRACT: Map of current cocation

use strict;
use DDG::Spice;

spice to => 'http://api.mapbox.com/v4/geocode/mapbox.places/$1.json?access_token={{ENV{DDG_SPICE_MAPBOX_KEY}}}';
spice is_cached => 0;
spice proxy_cache_valid => "418 1d";
spice wrap_jsonp_callback => 1;

my %generic_map_queries = map {$_ => 0} ('map', 'maps', 'current location');

triggers any => keys(%generic_map_queries);

handle query_lc => sub {
    # force generic
    return if !exists($generic_map_queries{$_});

    my $location = $loc->loc_str;
    return $location if $location;
    return;
};

1;

