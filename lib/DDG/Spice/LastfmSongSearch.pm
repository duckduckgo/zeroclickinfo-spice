package DDG::Spice::LastfmSongSearch;
# ABSTRACT: Search tracks.

use DDG::Spice;

spice to => 'http://ws.audioscrobbler.com/2.0/?limit=5&format=json&method=track.search&track=$1&api_key={{ENV{DDG_SPICE_LASTFM_APIKEY}}}&callback={{callback}}';

triggers startend => 'song', 'songs', 'track', 'tracks', 'listen', 'hear', 'listen to';

handle remainder => sub {
	return $_ if $_;
	return;
};
1;
