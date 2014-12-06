package DDG::Spice::Tvmaze::Nextepisode;

use DDG::Spice;

# the next episode will change the moment an episode has aired, so cache it for just one hour
spice is_cached => 1;
spice proxy_cache_valid => "200 301 302 404 1h";

name "TVmaze";
source "TVmaze";
icon_url "/ip2/www.tvmaze.com.ico";
description "Basic information about the next episode for a given TV show";
primary_example_queries "homeland next episode";
category "entertainment";
topics "entertainment";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Tvmaze/Nextepisode.pm";
attribution github => ["https://github.com/tvdavid", "tvdavid"], twitter => "tvmaze";

triggers any => 'episode', 'airdate';

spice to => 'http://api.tvmaze.com/instantsearch/shows?q=$1&embed=nextepisode';
spice wrap_jsonp_callback => 1;

handle query_lc => sub {
    return unless $_;
    
    return $4 if $_ =~ /(next|upcoming) (episode|airdate) (in|of|for|from)? ?([a-z0-9 ]+)/;
    
    return $2 if $_ =~ /(next|upcoming) ([a-z0-9 ]+) episode/;
    
    return $1 if $_ =~ /([a-z0-9 ]+) (next|upcoming) (episode|airdate)/;

    return;
};

1;
