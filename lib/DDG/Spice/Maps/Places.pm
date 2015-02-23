package DDG::Spice::Maps::Places;

use strict;
use DDG::Spice;

spice to => 'https://duckduckgo.com/local.js?q=$1&cb={{callback}}';

# no caching.
spice proxy_cache_valid => "418 1d";
spice is_cached => 0;

triggers startend => (
    'local',
    'near',
    'near me',
    'around',
    'around me',
    'here',
    'locally',
    'nearby',
    'close',
    'closest',
    'nearest',

    'locations',
    'location',

    'restaurant',
    'restaurants',
);

my %skip_remainders = map {$_ => 0} ('current');

handle remainder => sub {
    return $_ if $_ && !exists($skip_remainders{$_});
    return;
};

1;

