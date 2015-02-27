package DDG::Spice::ProductHunt;
# ABSTRACT: Returns products information from ProductHunt's index.

use DDG::Spice;

name 'ProductHunt Search';
description 'Search for fresh products, apps, projects';
source 'ProductHunt via Algolia';
primary_example_queries 'producthunt duck', 'product hunt clock app';
code_url 'https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/ProductHunt.pm';
category 'special';
topics 'economy_and_finance', 'programming', 'special_interest';
attribution
    github => ['https://github.com/sevastos', 'Sev'],
    twitter => ['https://twitter.com/smas', '@smas'],
    web => ['http://sevastos.com/', 'Sev'];

triggers startend => 'producthunt', 'product hunt';

spice to => 'http://0H4SMABBSG.algolia.io/1/indexes/Post_production?query=$1&callback={{callback}}&X-Algolia-Application-Id=0H4SMABBSG&X-Algolia-API-Key=9670d2d619b9d07859448d7628eea5f3';

handle remainder => sub {
    return $_ if $_;
    return;
};

1;
