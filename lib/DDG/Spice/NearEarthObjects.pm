package DDG::Spice::NearEarthObjects;
# ABSTRACT: Shows details of objects (asteroids) that come close to Earth — within several million miles.

use strict;
use DDG::Spice;

spice is_cached => 1;

spice wrap_jsonp_callback => 1;

spice to => 'https://api.nasa.gov/neo/rest/v1/feed?format=JSON&api_key={{ENV{DDG_SPICE_NASA_APIKEY}}}';

my @triggers = (
    'near earth object',
    'near earth objects',
    'near earth asteroid',
    'near earth asteroids',
    'near-earth object',
    'near-earth objects',
    'near-earth asteroid',
    'near-earth asteroids',
    'close asteroid',
    'close asteroids'
);
triggers startend => @triggers;

handle remainder => sub {
    return $_;
};

1;
