package DDG::Spice::BikeSharing::BayAreaBikeShareCA;

use strict;
use DDG::Spice;

name 'Bay Area Bike ShareCA';
source 'Bay Area Bike Share CA';
icon_url 'http://www.bayareabikeshare.com/assets/images/bayarea/icons/favicon.ico';
description 'Search Bay Area Bike Share stations in the Bay Area, CA';
primary_example_queries 'bike share bay area', 'bike share san francisco';
secondary_example_queries 'bike share stations near san jose';
category 'geography';
topics 'everyday', 'travel', 'entertainment', 'geography';
code_url 'https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/BikeSharing/BayAreaBikeShareCA.pm';
attribution github => 'marianosimone',
            web  => ['http://www.marianosimone.com',  'Mariano Simone'];

triggers any => 'bike sharing', 'bike share', 'bikeshare';

spice to => 'http://www.bayareabikeshare.com/stations/json';
spice wrap_jsonp_callback => 1;
spice is_cached => 0;
spice proxy_cache_valid => '200 304 15m';

my @places = ("bay area", "san francisco", "sfo", "sf", "san jose", "mountain view", "palo alto", "redwood", "redwood city");
my $place_re = join "|", @places;

handle remainder => sub {
    my $place = $_ || undef;

    unless ($place) {
        $place = $loc->city if $loc && $loc->city;
    }

    return unless $place && $place =~ m/\b($place_re)\b/;
    return $1;
};

1;
