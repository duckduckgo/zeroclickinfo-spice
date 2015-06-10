package DDG::Spice::GetEvents::City;
#ABSTRACT: Returns events in a city.

use DDG::Spice;

primary_example_queries "events in chicago","what to do in chicago","things to do in chicago";
secondary_example_queries "chicago events","chicago things to do";
description "Upcoming events from GetEvents";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/GetEvents/City.pm";
category "entertainment";
topics "computing","entertainment","food_and_drink","music","science","special_interest","travel";

triggers start =>
    'events in',
    'what to do in',
    'things to do in';
triggers end =>
    'things to do',
    'events';
    
spice to => 'https://api.getevents.co/ddg?city=$1' ;

spice proxy_cache_valid => "200 12h";

spice wrap_jsonp_callback => 1;

handle remainder_lc => sub {
    return if $_ =~ "^my area";
    return if $_ =~ "^near me";

    return $_ if $_;
    return;
};
1;