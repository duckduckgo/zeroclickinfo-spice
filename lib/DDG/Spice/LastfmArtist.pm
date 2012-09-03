package DDG::Spice::LastfmArtist;
# ABSTRACT: Search for musicians in Last.fm and get artists or bands similar to them.

use DDG::Spice;

spice to => 'http://ws.audioscrobbler.com/2.0/?format=json&method=artist.getinfo&artist=$1&api_key={{ENV{DDG_SPICE_LASTFM_APIKEY}}}&callback={{callback}}_$2';
spice from => '(?:([^/]*)/([^/]*)|)';

#$1 == similar
#$2 == artist
#$3 == artist
#$4 == similar
triggers query_lc => qr/(?:(similar)\s+(?:(?:bands?|musicians?|artists?)\s+)?(?:to\s+)?(\w+(?:\s+\w+)*))|(?:(\w+(?:\s+\w+)*)\s+(similar)(?:\s+(?:bands?|musicians?|artists?))?)/i;

handle query_lc => sub {
	if($1 && $2) {
		return $2, $1;
	}
	#Not working 
	if($3 && $4) {
		return $3, $4;
	} 
	if($2) {
		return $2, 'all';
	} 
	if($3) { 
		return $3, 'all';
	}
	return;
};

1;
