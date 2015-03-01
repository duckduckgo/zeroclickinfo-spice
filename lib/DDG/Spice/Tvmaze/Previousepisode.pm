package DDG::Spice::Tvmaze::Previousepisode;

use strict;
use DDG::Spice;

# the previous episode will change the moment an episode has aired, so cache it for just one hour
spice is_cached => 1;
spice proxy_cache_valid => "200 301 302 404 1h";

name "TVmaze";
source "TVmaze";
icon_url "/ip2/www.tvmaze.com.ico";
description "Basic information about the previous episode for a given TV show";
primary_example_queries "homeland previous episode";
category "entertainment";
topics "entertainment";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Tvmaze/Previousepisode.pm";
attribution github => ["https://github.com/tvdavid", "tvdavid"], twitter => "tvmaze";

triggers any => 'episode', 'airdate';

spice to => 'http://api.tvmaze.com/singlesearch/shows?q=$1&embed=previousepisode';
spice wrap_jsonp_callback => 1;

handle query_lc => sub {
    return unless $_;
    
    return $4 if $_ =~ /(previous|last|latest) (episode|airdate) (in|of|for|from)? ?([a-z0-9 ]+)/;
    
    return $2 if $_ =~ /(previous|last|latest) ([a-z0-9 ]+) episode/;
    
    return $1 if $_ =~ /([a-z0-9 ]+) (previous|last|latest) (episode|airdate)/;

    return;
};

1;
