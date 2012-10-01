package DDG::Spice::Lastfm::Artist;
# ABSTRACT: Search for musicians in Last.fm and get artists or bands similar to them.

use DDG::Spice;

spice to => 'http://ws.audioscrobbler.com/2.0/?format=json&method=artist.getinfo&artist=$1&api_key={{ENV{DDG_SPICE_LASTFM_APIKEY}}}&callback={{callback}}';

triggers start => '//***never_trigger***//';

handle query_lc => sub {
    return;
};

1;
