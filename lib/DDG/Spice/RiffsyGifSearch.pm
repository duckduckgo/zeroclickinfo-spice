package DDG::Spice::RiffsyGifSearch;
# ABSTRACT: Search Riffsy (http://www.riffsy.com) for animated GIFs.
use DDG::Spice;

spice is_cached => 1;

name "RiffsyGifSearch";
source "Riffsy";
#icon_url "";
description "Search Riffsy for animated GIFs";
primary_example_queries "riffsy lol", "cat riffs", "dog gifs";
category "entertainment";
topics "everyday", "entertainment", "food_and_drink", "gaming", "geek", "music", "science", "social", "special_interest";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/RiffsyGifSearch.pm";
attribution github => ["https://github.com/bryanhart", "bryanhart"];

spice to => 'http://api1.riffsy.com/v1/search?tag=$1&key=KHN3RJFGFX3X&safesearch=strict';
spice wrap_jsonp_callback => 1;

triggers any => "riffsy", "riff", "riffs", "gif", "gifs";

handle remainder => sub {
    return unless $_;
    return $_;
};

1;
