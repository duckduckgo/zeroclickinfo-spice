package DDG::Spice::BikeSharing::CitiBikeNYC;

use strict;
use DDG::Spice;

name 'Citi Bike NYC';
source 'Citi Bike NYC';
icon_url 'http://www.citibikenyc.com/assets/images/favicon.ico';
description 'Search Citi Bike stations in New York City';
primary_example_queries 'citibike nyc', 'citi bike ny';
secondary_example_queries 'citibike stations near brooklyn';
category 'geography';
topics 'everyday', 'travel', 'entertainment', 'geography';
code_url 'https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/BikeSharing/CitiBikeNYC.pm';
attribution github => 'marianosimone',
            web  => ['http://www.marianosimone.com',  'Mariano Simone'];

triggers any => 'citibike', 'citi bike', 'bike sharing', 'bike share';

spice to => 'https://www.citibikenyc.com/stations/json';
spice wrap_jsonp_callback => 1;
spice is_cached => 0;
spice proxy_cache_valid => '200 304 15m';

handle remainder => sub {
    $loc->city.' '.$_ =~ /(ny|new york|nyc|new york city|brooklyn|manhattan|queens)/i;
    return unless $1;
    return $1;
};

1;
