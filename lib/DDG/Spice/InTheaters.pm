package DDG::Spice::InTheaters;
# ABSTRACT: Show movies from Rotten Tomatoes.

use DDG::Spice;

spice to => 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?apikey=ccw2b5ce8dsy7sb3x2qxmn3x&callback={{callback}}';

triggers query_lc => qr/\s*(?:\s*(?:i\s+|we\s+)?(?:want\s+|need\s+|deserve\s+)?(?:to\s+)?(?:watch\s*|see\s*)(?:something|(?:a\s+)?movies?)\s*)|\s*(?:movies\s*)(?:(?:in\s+)?theaters?)?(?:(?:now\s+|already\s+)?showing)?\s*|\s*what\s+(?:to\s+|can\s+I\s+)?watch\??\s*$/i;

handle query_lc => sub {
	return $_;
};

1;