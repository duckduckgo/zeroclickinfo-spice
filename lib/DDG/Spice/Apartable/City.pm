package DDG::Spice::Apartable::City;

use DDG::Spice;

primary_example_queries "apartments {city}", "{city} apartments";
description "Search apartments by the city";
name "Apartable::City";
icon_url "http://apartable.com/favicon.ico";
source "Apartable::City";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Apartable/City.pm";
category "random";
attribution github => ['https://github.com/roman-yerin','Roman Yerin'], web => ['http://apartable.com','Apartable.com'];

spice to => 'http://apartable.com/search.json?city=$1';
spice wrap_jsonp_callback => 1;

triggers startend => "apartments";

handle remainder => sub {
    return if $_=~/\d{5}/;
    return $_ if $_!~/,/; # There's no cities with a comma in its name, so probably this is a city with a state and it should be processed in another module
    return;
};

1;
