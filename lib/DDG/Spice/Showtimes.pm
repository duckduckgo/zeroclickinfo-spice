package DDG::Spice::Showtimes;
# ABSTRACT: Write an abstract here

use DDG::Spice;
use strict;
use warnings;

spice is_cached => 1;
spice proxy_cache_valid => "200 10m";
spice wrap_jsonp_callback => 0;

spice to => 'http://example.com/search/$1';
triggers any => 'movies in', 'movie in', 'films in', 'film in';

# Handle statement
handle query_lc => sub {
    my ($query) = $_;

    # Query is in $_ or @_, depending on the handle you chose...if you
    # need to do something with it before returning
    return \$_;
};

1;
