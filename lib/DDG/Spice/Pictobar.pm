package DDG::Spice::Pictobar;
#ABSRACT: return search for person on pictobar to display ratings, tags and link to person and other qualities

use DDG::Spice;

triggers query => qr/^(\w+\s\w+\s?\w*)|([\d\s\-\+\.()]{6,20})|([a-zA-Z0-9._%\-+]+@[a-zA-Z0-9._%\-]+\.[a-zA-Z]{2,6})$/;

spice to => 'http://www.pictobar.com/api/people_s?callback={{callback}}&sid=$1';

handle matches => sub {
	return @_ if @_;
	return;
};

1;