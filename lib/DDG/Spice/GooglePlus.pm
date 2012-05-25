package DDG::Spice::GooglePlus;
# ABSTRACT: Search for Google+ users and return their bio.

use DDG::Spice;

spice to => 'https://www.googleapis.com/plus/v1/people/$1?query=$2&fields=$3&key={{ENV{DDG_SPICE_RANDWORD_APIKEY}}}&callback={{callback}}';
spice from => '(?:([^/]*)/([^/]*)/([^/]*)|)';

triggers startend => 'google+';

handle remainder => sub {
	my $query = $_;
	if($query =~ /(\d+)$/) {
		return $1, '', 'birthday,currentLocation,displayName,emails,etag,gender,hasApp,id,image,kind,languagesSpoken,name,nickname,objectType,organizations,placesLived,relationshipStatus,tagline,url,urls';
	} elsif($query =~ /((?:[a-zA-Z]|\s)+)$/) {
		return '', $1, 'items,kind,nextPageToken,selfLink,title,totalItems';
	}
	return;
};
1;