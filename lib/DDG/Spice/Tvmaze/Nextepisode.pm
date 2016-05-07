package DDG::Spice::Tvmaze::Nextepisode;
# ABSTRACT: Information about the next episode of TV series

use strict;
use DDG::Spice;

# the next episode will change the moment an episode has aired, so cache it for just one hour
spice is_cached => 1;
spice proxy_cache_valid => "200 301 302 404 1h";

triggers any => 'episode', 'airdate';
triggers start => 'when does';

spice to => 'http://api.tvmaze.com/singlesearch/shows?q=$1&embed=nextepisode';
spice wrap_jsonp_callback => 1;

handle query_lc => sub {
    return unless $_;
        
    return $4 if $_ =~ /(next|upcoming) (episode|airdate) (in|of|for|from)? ?([a-z0-9 ]+)/;
        
    return $2 if $_ =~ /(next|upcoming) ([a-z0-9 ]+) episode/;

    return $1 if $_ =~ /([a-z0-9 ]+) (next|upcoming) (episode|airdate)/;
        
    return $2 if $_ =~ /(when does) ([a-z0-9 ]+) (start|come back|come out|air|return) ?(on)?/;

    return $2 if $_ =~ /(when does) ([a-z0-9 ]+) (season [0-9]+) (start|come out|air)/;

    return;
};

1;
