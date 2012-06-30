package DDG::Spice::InTheaters;
# ABSTRACT: Show movies from Rotten Tomatoes.

use DDG::Spice;

my $rating = '(?:g\s*|pg\s*|r\s*)?';
spice to => 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/$1.json?apikey=ccw2b5ce8dsy7sb3x2qxmn3x&callback={{callback}}';
triggers query_lc => qr/\s*(?:movies?\s*)?opening\s*($rating)(?:soon\s*)?(?:movies?|in\s*theaters)?\s*|\s*(?:\s*(?:i\s*|we\s*)?(?:want\s*|need\s*|deserve\s*)?(?:to\s*)?(?:watch\s*|see\s*)(?:something|(?:an?\s*)?($rating)movies?)\s*)|\s*($rating)(?:movies\s*|current(?:ly)?\s*)(?:(?:in\s*)?(?:theaters?|theatres?))?($rating)(?:(?:now\s*|already\s*)?showing)?\s*|\s*what\s*(?:to\s*|can\s*I\s*)?watch\??\s*$/i;

my %movies = (
	'movies now showing' => 1,
	'what can i watch?' => 1,
	'movies opening' => 0,
	'movies opening soon' => 0,
	'watch a movie' => 1,
	'opening soon in theaters' => 0,
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