package DDG::Spice::Apartable::City;

use DDG::Spice;

primary_example_queries "apartments {city}";
secondary_example_queries "{city} apartments";
description "Search apartments by the city";
name "Apartable::City";
icon_url "/i/apartable.com.ico";
source "Apartable::City";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Apartable/City.pm";
category "random";
attribution github => ['https://github.com/roman-yerin','Roman Yerin'];

spice to => 'http://apartable.com/search.json?city=$1';
spice wrap_jsonp_callback => 1;

triggers startend => "apartments";

handle remainder => sub {
    return if $_=~/\d{5}/;
    return $_ if $_!~/,/;
    return;
};

1;
