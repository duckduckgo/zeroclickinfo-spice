package DDG::Spice::Gifs;
# ABSTRACT: Search for gifs

use strict;
use DDG::Spice;

name "Gifs";
description "Animated Gifs";
primary_example_queries "funny cat gifs";
source "Giphy";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Gifs.pm";
attribution github => ['https://github.com/bsstoner','bsstoner'];

triggers startend => "gif", "gifs", "giphy";

spice to => 'http://api.giphy.com/v1/gifs/search?q=$1&api_key={{ENV{DDG_SPICE_GIPHY_APIKEY}}}';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
    return $_ if $_;
    return;
};

1;
