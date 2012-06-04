package DDG::Spice::LastfmTopTracks;
# ABSTRACT: Top 10 songs.

use DDG::Spice;

spice to => 'http://ws.audioscrobbler.com/2.0/?limit=10&format=json&method=chart.gettoptracks&api_key={{ENV{DDG_SPICE_LASTFM_APIKEY}}}&callback={{callback}}';

triggers query_lc => qr/tops?\s+(?:10\s)?(?:tracks?|charts?|songs?|musics?)/;

handle query_lc => sub {
	return $_;
};

1;
