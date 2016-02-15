package DDG::Spice::InTheaters;
# ABSTRACT: Show movies from Rotten Tomatoes.

use strict;
use DDG::Spice;

my $rating = '(?:g\s*|pg\s*|r\s*)?';
triggers any => 'movie', 'movies', 'theaters', 'theatres', 'cinemas', 'showing', 'something', 'watch', 'opening', 'see';
spice from => '(.*?)/(.*)';
spice to => 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/$1.json?country=$2&apikey={{ENV{DDG_SPICE_ROTTEN_APIKEY}}}&callback={{callback}}&page_limit=30&limit=30';

# Uses $loc so needs to not cache back end.
spice is_cached => 0;

spice proxy_cache_valid => "200 1d";

my %movies = (
    'movies now showing' => 1,
    'what can i watch?' => 1,
    'movies opening' => 0,
    'movies opening soon' => 0,
    'watch a movie' => 1,
    'opening soon in theaters' => 0,
    'opening soon in theatres' => 0,
    'opening movies' => 0,
    'r movies opening' => 0,
    'pg movies opening' => 0,
    'pg-13 movies opening' => 0,
    'g movies opening' => 0,
    'kids movies opening' => 0,
    'pg13 movies opening' => 0,
    'unrated movies opening' => 0,
    'see an r movie' => 1,
    'see a pg movie' => 1,
    'see a pg-13 movie' => 1,
    'see a g movie' =>1,
    'see a kids movie' => 1,
    'see a pg13 movie' =>1,
    'see an unrated movie' =>1,
    'pg13 movies opening soon' => 0,
    'unrated movies opening soon' => 0,
    'r movies opening soon' => 0,
    'pg movies opening soon' => 0,
    'pg-13 movies opening soon' => 0,
    'g movies opening soon' => 0,
    'kids movies opening soon' => 0,
    'i need to watch a movie' => 1,
    'i deserve to watch a movie' => 1,
    'i want to watch a movie' => 1,
    'i want to watch an r movie' => 1,
    'i want to watch a pg movie' => 1,
    'i want to watch a pg-13 movie' =>1,
    'i want to watch a pg13 movie' =>1,
    'i want to watch a kids movie' => 1,
    'i want to watch a g movie' => 1,
    'i want to watch an unrated movie' =>1,
    'i want to watch something' => 1,
    'watch something' => 1,
    'need to watch a movie' => 1,
    'need to watch an r movie' => 1,
    'need to watch a pg movie' => 1,
    'need to watch a pg-13 movie' => 1,
    'need to watch a g movie' => 1,
    'need to watch a kids movie' => 1,
    'need to watch a pg13 movie' => 1,
    'need to watch an unrated movie' => 1,
    'watch an r movie' => 1,
    'watch a pg movie' => 1,
    'watch a pg-13 movie' => 1,
    'watch a g movie' => 1,
    'watch a kids movie' => 1,
    'watch a pg13 movie' => 1,
    'watch an unrated movie' => 1,
    'theaters' => 0,
    'theatres' => 0,
    'movies' => 1,
    'r movies' => 1,
    'pg movies' => 1,
    'pg-13 movies' => 1,
    'g movies' => 1,
    'kids movies' => 1,
    'pg13 movies' => 1,
    'unrated movies' => 1,
    'movies in theaters' => 1,
    'movies in cinemas' => 1,
    'r movies in theaters' => 1,
    'pg movies in theaters' => 1,
    'pg-13 movies in theaters' => 1,
    'g movies in theaters' => 1,
    'kids movies in theaters' => 1,
    'pg13 movies in theaters' => 1,
    'unrated movies in theaters' => 1,
    'movies currently in theaters' => 1,
    'movies currently in theatres' => 1,
    'movies currently in cinemas' => 1,
    'currently in theaters' => 1,
    'currently in theatres' => 1,
    'currently in cinemas' => 1,
    );

handle query_lc => sub {
    return unless exists $movies{$_};
    if($movies{$_}) {
        return "in_theaters", $loc->country_code;
    } else {
        return "opening", $loc->country_code;
    }
};
1;
