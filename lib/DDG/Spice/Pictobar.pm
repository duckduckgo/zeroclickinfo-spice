package DDG::Spice::Pictobar;
#ABSRACT: return search for person on pictobar to display ratings, tags and link to person and other qualities

use DDG::Spice;

use LWP::Simple;

my $namsData = get('http://www.pictobar.com/api/names_s');

triggers query_raw => qr/$namsData/;

spice to => 'http://www.pictobar.com/api/people_s?callback={{callback}}&sid=$1';

handle matches => sub {
	return $_ if $_;
	return;
};

1;