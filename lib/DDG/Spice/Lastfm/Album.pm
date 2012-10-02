package DDG::Spice::Lastfm::Album;
# ABSTRACT: Display album info.

use DDG::Spice;

spice to => 'http://ws.audioscrobbler.com/2.0/?format=json&method=album.getinfo&album=$1&autocorrect=1&artist=$2&api_key={{ENV{DDG_SPICE_LASTFM_APIKEY}}}&callback={{callback}}';
spice from => '(?:([^/]*)/([^/]*)|)';

triggers query_lc => qr/^([^\s]+(?:\s+[^\s]+)*)\s+(?:albums?|records?|cds?)\s+(?:by|from)?\s+([^\s]+(?:\s+[^\s]+)*)$/;

handle matches => sub {
    if($1 and $2) {
        return $1, $2;
    }
    return;
};

1;
