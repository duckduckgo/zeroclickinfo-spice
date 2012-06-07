package DDG::Spice::GooglePlus;
# ABSTRACT: Search for Google+ users and return their bio.

use DDG::Spice;

spice to => 'https://www.googleapis.com/plus/v1/people/$1?query=$2&key={{ENV{DDG_SPICE_GOOGLE_PLUS_APIKEY}}}&callback={{callback}}';
spice from => '(.*?)-(.*)';
spice proxy_ssl_session_reuse => "off";

triggers startend => 'google+', 'google plus', 'g+', 'gplus', 'google+ user', 'g+ user', 
'google plus user', 'google+ profile', 'g+ profile', 'gplus profile', 'gplus user', 'g plus profile',
'g plus user';

handle remainder => sub {
	my $query = $_;
	if($query =~ /userid:(\d+)$/) {
		return $1.'-'; 
	}
    if($query =~ /((?:[a-zA-Z]|\s)+)$/) {
		return '-'.$1;
	}
	return;
};
1;