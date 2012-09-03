package DDG::Spice::Lastfm::TopTracks;
# ABSTRACT: Top 10 songs in a country. Defaults to USA.

use DDG::Spice;

spice to => 'http://ws.audioscrobbler.com/2.0/?format=json&method=geo.gettoptracks&country=$1&api_key={{ENV{DDG_SPICE_LASTFM_APIKEY}}}&callback={{callback}}';
triggers start => 'top', 'popular', 'popular songs in the', 'popular songs in', 'popular songs', 'popular tracks', 'top tracks', 'top songs';

handle remainder => sub {
	if($_) {
		return $_;
	} else {
		return "United States";
	}
	return;
};

1;
