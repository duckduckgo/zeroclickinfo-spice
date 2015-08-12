package DDG::Spice::IndegoBikeshareLocations;
# ABSTRACT: Write an abstract here
# Start at https://duck.co/duckduckhack/spice_overview if you are new
# to instant answer development

use strict;
use DDG::Spice;

name 'PHL Indego Bikeshare Locations';
source 'Indego Philadelphia';
icon_url 'http://www.rideindego.com/';
description 'Search Indego Bike stations in Philadelphia';
primary_example_queries 'indego philadelphia', 'bikeshare philadelphia';
secondary_example_queries 'philly bikeshare';
category 'geography';
topics 'everyday', 'travel', 'entertainment', 'geography';
code_url 'https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/IndegoBikeshareLocations.pm';
attribution github => 'AcriCAA',
            web  => ['http://www.coreyacri.com',  'Corey Acri'];

triggers any => 'indego', 'indego bikeshare', 'philly bikeshare', 'indego philadelphia', 'bikeshare', 'bike share', 'go indego'. 'indego philly';

spice to => 'https://api.phila.gov/bike-share-stations/v1';
spice wrap_jsonp_callback => 1;
spice proxy_cache_valid => '200 304 15m';

handle remainder => sub {
    $loc->city.' '.$_ =~ /(phl|philadelphia|philly)/i;
    return unless $1;
    return $1;
};

1;