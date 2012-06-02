package DDG::Spice::LastfmAlbumSongs;
# ABSTRACT: Get the songs from an album

use DDG::Spice;

spice to => 'http://ws.audioscrobbler.com/2.0/?format=json&method=album.getinfo&artist=$2&album=$1&api_key={{ENV{DDG_SPICE_LASTFM_APIKEY}}}&callback={{callback}}';
spice from => '(?:([^/]*)/([^/]*)|)';

triggers query_lc => qr/^(.+(?:\s+.+)*)\s+by\s+(.+(?:\s+.+)*)$/;

handle matches => sub {
	return $1, $2;
};
1;
