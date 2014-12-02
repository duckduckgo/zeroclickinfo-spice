package DDG::Spice::Tvmaze::Nextepisode;

use DDG::Spice;

spice is_cached => 1;

name "TVmaze";
source "TVmaze";
icon_url "/ip2/www.tvmaze.com.ico";
description "Basic information about the next episode for a given TV show";
primary_example_queries "homeland next episode";
category "entertainment";
topics "entertainment";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Tvmaze/Nextepisode.pm";
attribution github => ["https://github.com/tvdavid", "tvdavid"], twitter => "tvmaze";

triggers startend => 'next episode';

spice to => 'http://api.tvmaze.com/instantsearch/shows?q=$1&embed=nextepisode';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
    return unless $_;

    return $_;
};

1;
