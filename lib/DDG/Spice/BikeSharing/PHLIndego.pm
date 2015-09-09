package DDG::Spice::BikeSharing::PHLIndego;

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
code_url 'https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/BikeSharing/PHLIndego.pm';
attribution github => 'marianosimone',
            github => 'AcriCAA', 
            web => ['http://www.marianosimone.com',  'Mariano Simone'],
            web  => ['http://www.coreyacri.com',  'Corey Acri'],
            web => ['https://codeforphilly.org/', "Built at Code for Philly"];

triggers any => 'indego', 'bikeshare', 'bike share', 'ride indego', 'share bike';

spice to => 'https://api.phila.gov/bike-share-stations/v1';
spice wrap_jsonp_callback => 1;
spice proxy_cache_valid => '200 304 15m';

handle remainder_lc => sub {
    $loc->city.' '.$_ =~ /(philadelphia|phl|philly)/i;
    return unless $1;
    return $1;

};

1;