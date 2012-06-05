package DDG::Spice::LastfmAlbum;
# ABSTRACT: Display album info.

use DDG::Spice;

spice to => 'http://ws.audioscrobbler.com/2.0/?format=json&method=album.getinfo&album=$1&artist=$2&api_key={{ENV{DDG_SPICE_LASTFM_APIKEY}}}&callback={{callback}}';
spice from => '(?:([^/]*)/([^/]*)|)';

triggers query_lc => qr/^\s*(.+)\s+(?:album|record|recording|cd)\s+(?:by|from)\s+(.+)$/;

handle matches => sub {
	if($1 && $2) {
		return $1, $2;
	}
	return;
};

1;
