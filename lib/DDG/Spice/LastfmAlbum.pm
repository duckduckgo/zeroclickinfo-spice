package DDG::Spice::LastfmAlbum;
# ABSTRACT: Search for musicians in Last.fm and get their top albums.

use DDG::Spice;

spice to => 'http://ws.audioscrobbler.com/2.0/?limit=5&format=json&method=artist.gettopalbums&artist=$1&api_key={{ENV{DDG_SPICE_LASTFM_APIKEY}}}&callback={{callback}}';

triggers startend => 'album', 'albums', 'music';

handle remainder => sub {
	my $query = $_;
	return $query if $query;
	return;
};
1;
