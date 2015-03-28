package DDG::Spice::RonSwanson;
# ABSTRACT: Ron Swanson quote

use DDG::Spice;

spice is_cached => 0; 
spice proxy_cache_valid => "418 1d";

name "RonSwanson";
source "https://github.com/jamesseanwright/ron-swanson-quotes";
icon_url "http://media.tumblr.com/tumblr_mc21ozrzP31qczjz7.png";
description "Random Ron Swanson quote.";
primary_example_queries "Ron Swanson", "Ron Swanson hair";
category "random";
topics "trivia";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/RonSwanson.pm";
attribution github => ["talsraviv", "Tal Raviv"],
            twitter => "talraviv";

spice to => 'http://ron-swanson-quotes.herokuapp.com/quotes';
spice wrap_jsonp_callback => 1;

triggers startend => "ron swanson";

handle remainder => sub {
    # Frontend needs no dynamic input, so returning a trivial value
    return "";
};

1;
