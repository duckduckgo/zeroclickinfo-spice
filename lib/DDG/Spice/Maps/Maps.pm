package DDG::Spice::Maps::Maps;

use DDG::Spice;

spice to => 'http://open.mapquestapi.com/nominatim/v1/search?format=json&json_callback={{callback}}&addressdetails=1&polygon=1&bounded=0&q=$1';
spice is_cached => 0;
spice proxy_cache_valid => "418 1d";

triggers startend => (
    'map',
    'maps',
    'current location',
    'where am i',
);

handle query_lc => sub {
    my $location = $loc->loc_str;
    return $location if $location;
};

1;

