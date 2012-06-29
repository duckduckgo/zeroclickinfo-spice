package DDG::Spice::InTheaters;
# ABSTRACT: Show movies from Rotten Tomatoes.

use DDG::Spice;

my $rating = '(?:g\s*|pg\s*|r\s*)?';
spice to => 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/$1.json?apikey=ccw2b5ce8dsy7sb3x2qxmn3x&callback={{callback}}';
triggers query_lc => qr/\s*(?:movies?\s*)?opening\s*($rating)(?:soon\s*)?(?:movies?|in\s*theaters)?\s*|\s*(?:\s*(?:i\s*|we\s*)?(?:want\s*|need\s*|deserve\s*)?(?:to\s*)?(?:watch\s*|see\s*)(?:something|(?:an?\s*)?($rating)movies?)\s*)|\s*($rating)(?:movies\s*|current(?:ly)?\s*)(?:(?:in\s*)?(?:theaters?|theatres?))?($rating)(?:(?:now\s*|already\s*)?showing)?\s*|\s*what\s*(?:to\s*|can\s*I\s*)?watch\??\s*$/i;

handle query_lc => sub {
	if(/\s*($rating)(?:movies?\s*)?opening\s*($rating)(?:soon\s*)?($rating)(?:movies?|in\s*theaters)?\s*$/i) {
		return "opening";
	}
	if(/\s*(?:\s*(?:i\s*|we\s*)?(?:want\s*|need\s*|deserve\s*)?(?:to\s*)?(?:watch\s*|see\s*)(?:something|(?:an?\s*)?($rating)movies?)\s*)|\s*($rating)(?:movies\s*|current(?:ly)?\s*)(?:(?:in\s*)?(?:theaters?|theatres?))?($rating)(?:(?:now\s*|already\s*)?showing)?\s*|\s*what\s*(?:to\s*|can\s*I\s*)?watch\??\s*$/i) {
		return "in_theaters";
	} 
	return;
};

1;