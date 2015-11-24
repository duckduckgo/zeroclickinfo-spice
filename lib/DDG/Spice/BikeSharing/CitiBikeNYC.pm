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

triggers any => 'citibike', 'citi bike', 'bike sharing', 'bike share', 'bikeshare';

spice to => 'https://www.citibikenyc.com/stations/json';
spice wrap_jsonp_callback => 1;
spice is_cached => 0;
spice proxy_cache_valid => '200 304 15m';

my @places = ("new york city", "new york", "nyc", "ny", "brooklyn", "manhattan", "queens");
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
