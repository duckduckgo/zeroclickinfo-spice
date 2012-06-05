package DDG::Spice::LastfmAlbumSearch;
# ABSTRACT: Search albums.

use DDG::Spice;

spice to => 'http://ws.audioscrobbler.com/2.0/?limit=5&format=json&method=album.search&album=$1&api_key={{ENV{DDG_SPICE_LASTFM_APIKEY}}}&callback={{callback}}';

triggers startend => 'album', 'albums', 'records', 'record', 'cd', 'cds';

handle remainder => sub {
	return $_ if $_;
	return;
};
1;
