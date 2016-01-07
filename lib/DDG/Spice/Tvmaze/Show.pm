package DDG::Spice::Tvmaze::Show;
# ABSTRACT: Information about TV series

use strict;
use DDG::Spice;

# generic tv show information won't change very often, cache it for a day
spice is_cached => 1;
spice proxy_cache_valid => "200 301 302 404 1d";

triggers startend => 'tv', 'tv show', 'tv series', 'series';
triggers end => 'show';

spice to => 'http://api.tvmaze.com/singlesearch/shows?q=$1';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
    return unless $_;

    return $_;
};

1;
