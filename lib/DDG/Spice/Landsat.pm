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

triggers query_lc => qr/^
    (?:landsat|(?:land )?sat(?:ellite)?)\s*
    (?:pic(?:ture)?s?|(?:img|image(?:ry)?)s?|photo(?:graph)?s?)?\s*
    (-?\d+(?:\.\d+)?)
    \s*,?\s*
    (-?\d+(?:\.\d+)?)
$/x;

spice from => '(.*)/(.*)';

handle query_lc => sub {
    return $1, $2;
};

1;
