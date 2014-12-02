package DDG::Spice::Tvmaze::Show;

use DDG::Spice;

spice is_cached => 1;

name "TVmaze";
source "TVmaze";
icon_url "/ip2/www.tvmaze.com.ico";
description "Basic information about a TV show";
primary_example_queries "homeland tv";
category "entertainment";
topics "entertainment";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Tvmaze/Show.pm";
attribution github => ["https://github.com/tvdavid", "tvdavid"], twitter => "tvmaze";

triggers end => 'tv show', 'tv', 'show', 'series';

spice to => 'http://api.tvmaze.com/instantsearch/shows?q=$1';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
    return unless $_;

    return $_;
};

1;
