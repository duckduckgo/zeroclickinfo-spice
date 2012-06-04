package DDG::Spice::LastfmArtistAlbum;
# ABSTRACT: Get the albums of a musician.

use DDG::Spice;

spice to => 'http://ws.audioscrobbler.com/2.0/?limit=5&format=json&method=artist.gettopalbums&artist=$1&api_key={{ENV{DDG_SPICE_LASTFM_APIKEY}}}&callback={{callback}}';

triggers query_lc => qr/^\s*(?:albums?|records?|cds?)\s*(?:by|from)?\s*(.+)$/;

handle matches => sub {
	return $1 if $1;
	return;
};
1;
