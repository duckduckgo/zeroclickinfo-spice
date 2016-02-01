package DDG::Spice::ProductHunt;
# ABSTRACT: Returns products information from ProductHunt's index.

use DDG::Spice;

triggers startend => 'producthunt', 'product hunt';

# API provided by Algolia for ProductHunt keyword search: https://github.com/producthunt/producthunt-api/wiki/Product-Hunt-APIs#algolia-search-api
spice to => 'http://0H4SMABBSG.algolia.io/1/indexes/Post_production?query=$1&callback={{callback}}&X-Algolia-Application-Id=0H4SMABBSG&X-Algolia-API-Key=9670d2d619b9d07859448d7628eea5f3';

handle remainder => sub {
    return $_ if $_;
    return;
};

1;
