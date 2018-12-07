package DDG::Spice::Movie;
# ABSTRACT: Movie information from Rotten Tomatoes

use strict;
use DDG::Spice;

spice proxy_cache_valid => "200 7d";
spice to => 'http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey={{ENV{DDG_SPICE_ROTTEN_APIKEY}}}&q=$1&page_limit=50&page=1&callback={{callback}}';

spice alt_to => {
	movie_image => {
		to => 'https://api.themoviedb.org/3/find/$1?api_key={{ENV{DDG_SPICE_MOVIEDB_APIKEY}}}&external_source=imdb_id',
		proxy_cache_valid => "200 30d"
	},

	cast_image => {
		to => 'https://api.themoviedb.org/3/search/person?query=$1&api_key={{ENV{DDG_SPICE_MOVIEDB_APIKEY}}}',
		proxy_cache_valid => "200 30d"
	}
};

# This spice will usually be triggered by deep triggers,
# with a few extra triggers that deep might miss.
my @triggers = ( 'rotten tomatoes', 'rotten', 'cast', 'casts', 'actor', 'actors', 'actress', 'actresses');
my @triggers_start = ( 'cast of', 'casts of', 'who stars in', 'who starred in', 'actor in', 'actors in', 'actress in', 'actresses in' );
my @triggers_end =( 'movie cast', 'movie casts');
triggers start => @triggers_start;
triggers end => @triggers_end;
triggers startend => @triggers;

handle remainder => sub {
    return unless $_;
    return $_;
};

1;
