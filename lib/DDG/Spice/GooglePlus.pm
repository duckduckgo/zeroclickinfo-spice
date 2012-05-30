package DDG::Spice::GooglePlus;
# ABSTRACT: Search for Google+ users and return their bio.

use DDG::Spice;

spice to => 'https://www.googleapis.com/plus/v1/people/$1?query=$2&key={{ENV{DDG_SPICE_GOOGLE_PLUS_APIKEY}}}&callback={{callback}}';
spice from => '(?:([^/]*)/([^/]*)|)';

triggers startend => 'google+', 'google plus', 'g+', 'gplus', '+';

handle remainder => sub {
	my $query = $_;
	if($query =~ /(\d+)$/) {
		return $1, ''; 
	} elsif($query =~ /((?:[a-zA-Z]|\s)+)$/) {
		return '', $1; 
	}
	return;
};
1;
