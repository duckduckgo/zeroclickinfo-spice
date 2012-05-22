package DDG::Spice::GooglePlus;
# ABSTRACT: Give the Google+ users matching the search item.

use DDG::Spice;

spice to => 'https://www.googleapis.com/plus/v1/people?query=$1&maxResults=6&key={{ENV{DDG_SPICE_RANDWORD_APIKEY}}}&callback={{callback}}';

triggers startend => 'google+';

handle remainder => sub {
	return $_ if $_;
	return;
};

1;