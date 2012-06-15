package DDG::Spice::InTheaters;
# ABSTRACT: Show movies from Rotten Tomatoes.

use DDG::Spice;

spice to => 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?apikey=ccw2b5ce8dsy7sb3x2qxmn3x&page_limit=5&callback={{callback}}';

triggers query_lc => qr/(?:\s*(?:i\s+|we\s+)?(?:want\s+|need\s+|deserve\s+)?(?:to\s+)?(?:watch\s*|see\s*)(?:something|(?:a\s+)?movies?)\s*)|(?:movies\s*)(?:(?:in\s+)?theaters?)?\s*$/i;

handle query_lc => sub {
	return $_;
};

1;