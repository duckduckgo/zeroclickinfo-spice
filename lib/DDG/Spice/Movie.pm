package DDG::Spice::Movie;
# ABSTRACT: Movie information from Rotten Tomatoes

use strict;
use DDG::Spice;

spice proxy_cache_valid => "200 7d";
spice to => 'http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey={{ENV{DDG_SPICE_ROTTEN_APIKEY}}}&q=$1&page_limit=50&page=1&callback={{callback}}';

# This spice will usually be triggered by deep triggers,
# with a few extra triggers that deep might miss.
my @triggers = ( 'rotten tomatoes', 'rotten');
triggers startend => @triggers;

handle remainder => sub {
    return unless $_;
    return $_;
};

1;
