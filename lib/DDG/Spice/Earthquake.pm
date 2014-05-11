package DDG::Spice::Earthquake;

use DDG::Spice;

name 'Earthquake';
source 'USGS';
icon_url '/i/www.usgs.gov.ico';
description 'List recent earthquakes worldwide';
primary_example_queries 'earthquake';
category 'geography';
topics 'geography';
code_url 'https://github.com/yzwx/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Earthquake.pm';
attribution github => ['https://github.com/yzwx', 'yzwx'];

triggers startend => (
     'earthquake',
     'earthquakes',
     'quake',
     'quakes'
);

spice to => 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
    return '' if $_ eq '';
    return;
};

1;
