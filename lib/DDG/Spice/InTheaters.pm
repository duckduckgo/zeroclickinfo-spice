package DDG::Spice::InTheaters;
# ABSTRACT: Show movies from Rotten Tomatoes.

use DDG::Spice;

my $rating = '(?:g\s*|pg\s*|r\s*)?';
spice to => 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/$1.json?apikey=ccw2b5ce8dsy7sb3x2qxmn3x&callback={{callback}}';
triggers any => 'movie', 'movies', 'theaters', 'theatres', 'showing', 'something', 'watch', 'opening', 'see';

my %movies = (
	'movies now showing' => 1,
	'what can i watch?' => 1,
	'movies opening' => 0,
	'movies opening soon' => 0,
	'watch a movie' => 1,
	'opening soon in theaters' => 0,
	'opening soon in theatres' => 0,
	'r movies opening' => 0,
	'pg movies opening' => 0,
	'pg-13 movies opening' => 0,
	'g movies opening' => 0,
	'see an r movie' => 1,
	'see a pg movie' => 1,
	'see a pg-13 movie' => 1,
	'see a g movie' =>1,
	'r movies opening soon' => 0,
	'pg movies opening soon' => 0,
	'pg-13 movies opening soon' => 0,
	'g movies opening soon' => 0,
	'i need to watch a movie' => 1,
	'i deserve to watch a movie' => 1,
	'i want to watch a movie' => 1,
	'i want to watch an r movie' => 1,
	'i want to watch a pg movie' => 1,
	'i want to watch a pg-13 movie' =>1,
	'i want to watch something' => 1,
	'watch something' => 1,
	'need to watch a movie' => 1,
	'need to watch an r movie' => 1,
	'need to watch a pg movie' => 1,
	'need to watch a pg-13 movie' => 1,
	'need to watch a g movie' => 1,
	'watch an r movie' => 1,
	'watch a pg movie' => 1,
	'watch an pg-13 movie' => 1,
	'watch a g movie' => 1,
	'theaters' => 0,
	'theatres' => 0,
	'movies' => 1,
	'r movies' => 1,
	'pg movies' => 1,
	'pg-13 movies' => 1,
	'g movies' => 1,
	'movies in theaters' => 1,
	'r movies in theaters' => 1,
	'pg movies in theaters' => 1,
	'pg-13 movies in theaters' => 1,
	'g movies in theaters' => 1,
	'movies currently in theaters' => 1,
	'movies currently in theatres' => 1,
	'currently in theaters' => 1,
	'currently in theatres' => 1,
	);

handle query_lc => sub {
	return unless exists $movies{$_};
	if($movies{$_}) {
		return "in_theaters";
	} else {
		return "opening";
	}
};
1;