package DDG::Spice::RiffsyEmojiSearch;
# ABSTRACT: Search Riffsy (http://www.riffsy.com) for animated GIFs related to an emoji.
use DDG::Spice;

spice is_cached => 1;

name "RiffsyEmojiSearch";
source "Riffsy";
#icon_url "";
description "Search Riffsy for animated GIFs";
primary_example_queries "riffsy lol", "cat riffs", "dog gifs";
category "entertainment";
topics "everyday", "entertainment", "food_and_drink", "gaming", "geek", "music", "science", "social", "special_interest";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/RiffsyEmojiSearch.pm";
attribution github => ["https://github.com/bryanhart", "bryanhart"];

spice to => 'http://api1.riffsy.com/v1/search?tag=$1&key=KHN3RJFGFX3X&safesearch=strict&searchtype=emoji';
spice wrap_jsonp_callback => 1;

triggers query_lc => qr/^\X$/;

handle query_lc => sub {
    return unless $_;
    return $_;
};

1;
