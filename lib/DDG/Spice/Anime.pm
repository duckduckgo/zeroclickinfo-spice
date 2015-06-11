package DDG::Spice::Anime;

use strict;
use DDG::Spice;

name "Anime";
description "Anime information from Hummingbird";
source "Hummingbird";
primary_example_queries "naruto anime";
secondary_example_queries "naruto hummingbird";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Anime.pm";
topics "entertainment", "everyday";
category "entertainment";
attribution github => ['https://github.com/jlcarvalho','Jean Lucas de Carvalho'],
           twitter => ['https://twitter.com/JLCarv','Jean Lucas de Carvalho'];

spice proxy_cache_valid => "200 30d";
spice to => 'https://hummingbird.me/api/v1/search/anime?query=$1';

triggers startend => 'anime', 'hummingbird';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
   return $_ if $_;
   return;
};

1;
