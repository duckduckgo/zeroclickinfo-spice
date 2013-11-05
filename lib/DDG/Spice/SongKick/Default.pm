package DDG::Spice::SongKick::Default;

use DDG::Spice;
use feature "switch";

triggers any => "songkick", "artist", "venue", "location";

spice to => 'http://api.songkick.com/api/3.0/search/$1s.json?query=$2&apikey={{ENV{DDG_SPICE_SONGKICK_APIKEY}}}&jsoncallback={{callback}}_$1';
spice from => '([^/]+)/([^/]+)';

handle query_lc => sub {
	my $callback;
	
	given ($_) {
		when (qr/\s+artist\s+/)   { $callback = 'artist' }
		when (qr/\s+venue\s+/) 	  { $callback = 'venue' }
		when (qr/\s+location\s+/) { $callback = 'location' }
	}
	
	# Replace trigger words with blanks and then strip spaces
	s/songkick//i;
	s/artist|location|venue//ig;
	s/\s//g;
	my $query = $_;

	return $callback, $query if defined $callback;
	return;
};
1;