package DDG::Spice::Lastfm::ArtistAlbum;
# ABSTRACT: Get the albums of a musician.

use strict;
use DDG::Spice;

spice to => 'http://ws.audioscrobbler.com/2.0/?limit=5&format=json&method=artist.gettopalbums&artist=$1&autocorrect=1&api_key={{ENV{DDG_SPICE_LASTFM_APIKEY}}}&callback={{callback}}';

my $synonyms = "albums?|records?|cds?";
triggers query_lc => qr/^(?:$synonyms)\s+(?:(?:by|from|of)\s+)?([^\s]+(?:\s+[^\s]+)*)$
                        |
                        ^([^\s]+(?:\s+[^\s]+)*)\s+(?:$synonyms)$
                        |
                        ^([^\s]+(?:\s+[^\s]+)*)\s+(?:discography)$
                        |
                        ^(?:discography)\s+([^\s]+(?:\s+[^\s]+)*)$
                        /x;



handle matches => sub {
    return $1 if $1;
    return $2 if $2;
    return $3 if $3;
    return $4 if $4;
    return;
};
1;
