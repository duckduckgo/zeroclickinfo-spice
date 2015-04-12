package DDG::Spice::Movie;
# ABSTRACT: Movie information from Rotten Tomatoes

use strict;
use DDG::Spice;

primary_example_queries "the graduate rotten tomatoes";
secondary_example_queries "jiro dreams of sushi rotten tomatoes", "indie game rotten tomatoes";
description "Movie information from Rotten Tomatoes";
name "Movie";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Movie.pm";
icon_url "/i/www.rottentomatoes.com.ico";
topics "entertainment", "everyday";
category "entertainment";
attribution github => ['https://github.com/moollaza','Zaahir Moolla'],
           twitter => ['https://twitter.com/zmoolla','Zaahir Moolla'];

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
