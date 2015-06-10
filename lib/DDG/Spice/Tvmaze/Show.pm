package DDG::Spice::Tvmaze::Show;
# ABSTRACT: Information about TV series

use strict;
use DDG::Spice;

# generic tv show information won't change very often, cache it for a day
spice is_cached => 1;
spice proxy_cache_valid => "200 301 302 404 1d";

name "TVmaze";
source "TVmaze";
icon_url "/ip2/www.tvmaze.com.ico";
description "Basic information about a TV show";
primary_example_queries "homeland tv";
category "entertainment";
topics "entertainment";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Tvmaze/Show.pm";
attribution github => ["https://github.com/tvdavid", "tvdavid"], twitter => "tvmaze";

triggers startend => 'tv', 'tv show', 'tv series', 'series';
triggers end => 'show';

spice to => 'http://api.tvmaze.com/singlesearch/shows?q=$1';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
    return unless $_;

    return $_;
};

1;
