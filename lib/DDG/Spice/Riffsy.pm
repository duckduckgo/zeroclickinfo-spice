package DDG::Spice::Riffsy;
# ABSTRACT: Search Riffsy (http://www.riffsy.com) for animated GIFs.
use DDG::Spice;
use utf8;

spice is_cached => 1;
spice proxy_cache_valid => "200 1d";

name "Riffsy";
source "Riffsy";
description "Search Riffsy for animated GIFs";
primary_example_queries "👍", "lol gifs", "cat gif";
category "entertainment";
topics "everyday", "entertainment", "food_and_drink", "gaming", "geek", "music", "science", "social", "special_interest";
code_url "https://github.com/bryanhart/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Riffsy.pm";
attribution web => ["http://www.riffsy.com","Riffsy"],
            twitter => "riffsyapp";

spice to => 'http://api1.riffsy.com/v1/search?tag=$1&key={{ENV{DDG_SPICE_RIFFSY_APIKEY}}}&safesearch=strict&searchtype=ddg';
spice wrap_jsonp_callback => 1;

triggers query_lc => qr/^\X$|^(\X+|[\w\s]+?) gifs?$/;

handle query_lc => sub {
    return if !$_ || $_ =~ /^[a-zA-Z0-9]$/;
    return $_;
};

1;
