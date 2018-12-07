package DDG::Spice::Tvmaze::Previousepisode;
# ABSTRACT: Information about the previous episode of TV series

use strict;
use DDG::Spice;

# the previous episode will change the moment an episode has aired, so cache it for just one hour
spice is_cached => 1;
spice proxy_cache_valid => "200 301 302 404 1h";

triggers any => 'episode', 'airdate';

spice to => 'http://api.tvmaze.com/singlesearch/shows?q=$1&embed=previousepisode';
spice wrap_jsonp_callback => 1;

handle query_lc => sub {
    return unless $_;

    return $4 if $_ =~ /(previous|last|latest|recent) (episode|airdate) (in|of|for|from)? ?(.+)/;

    return $2 if $_ =~ /(previous|last|latest|recent) (.+?) episode/;

    return $1 if $_ =~ /(.+?) (previous|last|latest|recent) (episode|airdate)/;

    return;
};

1;
