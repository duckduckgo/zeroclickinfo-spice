package DDG::Spice::InTheaters;
# ABSTRACT: Show movies from Rotten Tomatoes.

use DDG::Spice;

spice to => 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?apikey=ccw2b5ce8dsy7sb3x2qxmn3x&callback={{callback}}';
my $rating = '(g\s+|pg\s+|r\s+)?';
triggers query_lc => qr/\s*(?:\s*(?:i\s+|we\s+)?(?:want\s+|need\s+|deserve\s+)?(?:to\s+)?(?:watch\s*|see\s*)(?:something|(?:an?\s+$rating)?movies?)\s*)|\s*$rating(?:movies\s*|current(?:ly)?\s*)$rating(?:movies\s*)?(?:(?:in\s+)?(?:theaters?|theatres?))?(?:(?:now\s+|already\s+)?showing)?\s*|\s*what\s+(?:to\s+|can\s+I\s+)?watch\??\s*$/i;

handle query_lc => sub {
	return $_;
};

1;