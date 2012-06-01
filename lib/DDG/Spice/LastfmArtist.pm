package DDG::Spice::LastfmArtist;
# ABSTRACT: Search for musicians in Last.fm and get their bio.

use DDG::Spice;

spice to => 'http://ws.audioscrobbler.com/2.0/?format=json&method=artist.getinfo&artist=$1&api_key={{ENV{DDG_SPICE_LASTFM_APIKEY}}}&callback={{callback}}';

triggers startend => 'artist', 'bands', 'artists', 'band', 'musician', 'musicians';

handle remainder => sub {
	my $query = $_;
	return $query if $query;
	return;
};
1;
