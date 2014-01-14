package DDG::Spice::Maps::Maps;

use DDG::Spice;

spice to => 'https://127.0.0.1/map/$1';
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

