package DDG::Spice::Pictobar;
#ABSRACT: return search for person on pictobar to display ratings, tags and link to person and other qualities

use DDG::Spice;

triggers query_raw => qr/cinque mcfarlane-blake/;

spice to => 'http://www.pictobar.com/api/people_s?callback={{callback}}&sid=$1';

handle matches => sub {
	return $_;
};

1;