package DDG::Spice::LastfmTopTracks;
# ABSTRACT: Top 10 songs in a country. Defaults to USA.

use DDG::Spice;

spice to => 'http://ws.audioscrobbler.com/2.0/?format=json&method=geo.gettoptracks&country=$1&api_key={{ENV{DDG_SPICE_LASTFM_APIKEY}}}&callback={{callback}}';

triggers query_lc => qr/tops?\s+(?:10\s)?(?:tracks?|charts?|songs?|musics?)(?:\s+in\s+(?:the\s+)?)?(.*)/;

handle query_lc => sub {
	if($1) {
		return $1;
	} else {
		return "United States";
	}
	return;
};

1;
