package DDG::Spice::GooglePlusUser;
# ABSTRACT: Search for Google+ users and return their bio.

use DDG::Spice;

spice to => 'https://www.googleapis.com/plus/v1/people/$1?key={{ENV{DDG_SPICE_GOOGLE_PLUS_APIKEY}}}&callback={{callback}}';

triggers start => 'guserid:';

handle remainder => sub {
	my $query = $_;
	if($query =~ /(\d+)$/){
		return $query;
	}
	return;
};
1;