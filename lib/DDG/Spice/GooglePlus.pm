package DDG::Spice::GooglePlus;
# ABSTRACT: Search for Google+ users and return their bio.

use DDG::Spice;

spice to => 'https://www.googleapis.com/plus/v1/people/?query=$1&key={{ENV{DDG_SPICE_GOOGLE_PLUS_APIKEY}}}&callback={{callback}}';

triggers startend => 'google+', 'google plus', 'g+', 'gplus', 'google+ user', 'g+ user', 
'google plus user', 'google+ profile', 'g+ profile', 'gplus profile', 'gplus user', 'g plus profile',
'g plus user';

handle remainder => sub {
	return $_ if $_;
	return;
};
1;