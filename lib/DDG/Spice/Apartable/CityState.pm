package DDG::Spice::Apartable::CityState;

use DDG::Spice;

primary_example_queries "{City},{State} apartments";
description "Search apartaments by state abbreviation and city name";
name "Apartable::CityState";
icon_url "http://apartable.com/favicon.ico";
source "Apartable::CityState";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Apartable/CityState.pm";
category "random";
attribution github => ['https://github.com/roman-yerin','Roman Yerin'], web => ['http://apartable.com','Apartable.com'];

spice to => 'http://apartable.com/search.json?state=$3&city=$2&q=$1';
spice from => '([^/]+)/?(?:([^/]+)/?(?:([^/]+)|)|)';
spice wrap_jsonp_callback => 1;

triggers end => "apartments";

handle remainder => sub {
    # I need 3 parameters for API call which I fetch with the following regexp:
    # 1) The whole query
    # 2) The city name
    # 3) The state abbreviation
    return $1,$2,$3 if $_=~/(([^,]+)\s*,\s*([A-Z]{2}))/;
    return;
};

1;
