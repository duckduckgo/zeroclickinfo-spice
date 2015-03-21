package DDG::Spice::Anime;

use strict;
use DDG::Spice;

primary_example_queries "naruto anime";
description "Anime information from Hummingbird";
name "Movie";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Anime.pm";
topics "entertainment", "everyday";
category "entertainment";
attribution github => ['https://github.com/jlcarvalho','Jean Lucas de Carvalho'],
           twitter => ['https://twitter.com/JLCarv','Jean Lucas de Carvalho'];

spice proxy_cache_valid => "200 30d";
spice to => 'https://hummingbird.me/api/v1/search/anime?query=$1';

# It's important that 'movie info' precede 'movie' so that the handler
# encounters it first and removes both words, rather than encountering 'movie'
# first in the list, removing it, and leaving the word 'info.'

# This spice will usually be triggered by deep triggers,
# with a few extra triggers that deep might miss.
triggers startend => 'anime', 'hummingbird';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
   return $_ if $_;
   return;
};

1;
