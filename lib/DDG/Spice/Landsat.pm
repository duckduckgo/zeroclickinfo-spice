package DDG::Spice::Landsat;
# ABSTRACT: Gets satellite imagery for given lat/lon

use strict;
use DDG::Spice;

primary_example_queries 'landsat 40.7033127,-73.979681';
description 'NASA Landsat imagery';
name 'Landsat';
attribution web => ['http://dylansserver.com','Dylan Lloyd'],
            email => ['dylan@dylansserver.com','Dylan Lloyd'],
            github => ['https://www.github.com/nospampleasemam', 'Dylan Lloyd'];

spice to => 'https://api.data.gov/nasa/planetary/earth/imagery?api_key={{ENV{DDG_SPICE_NASA_APIKEY}}}&lat=$1&lon=$2&dim=0.5';

spice wrap_jsonp_callback => 1;

my @satellite_names = qw/sat satellite land landsat/;
my @image_names = qw/pic picture photo photograph img image imagery/;

triggers any => ('landsat', map {
    my $satellite_name = $_;
    map {(
        "$satellite_name $_",
        "$satellite_name $_" . 's',
        "$_ $satellite_name",
        $_ . 's ' . $satellite_name
    )} @image_names;
} @satellite_names);

spice from => '(.*)/(.*)';

handle query_lc => sub {
    m/
     (-?\d+(?:\.\d+)?)
     \s*,?\s*
     (-?\d+(?:\.\d+)?)
    /x;
    return $1, $2;
};

1;
