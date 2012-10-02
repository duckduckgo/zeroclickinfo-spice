package DDG::Spice::Lastfm::ArtistTracks;
# ABSTRACT: Get the tracks of a musician.

use DDG::Spice;

spice to => 'http://ws.audioscrobbler.com/2.0/?limit=5&format=json&method=artist.gettoptracks&artist=$1&autocorrect=1&api_key={{ENV{DDG_SPICE_LASTFM_APIKEY}}}&callback={{callback}}';

#Queries like "songs by ben folds" and "ben folds songs"
my $synonyms = "songs|tracks?|music";
triggers query_lc => qr/(?:^(?:$synonyms)\s+(?:(?:by|from|of)\s+)?([^\s]+(?:\s+[^\s]+)*)$)|(?:^([^\s]+(?:\s+[^\s]+)*)\s+(?:$synonyms)$)/;

handle query_lc => sub {
    return $1 if $1;
    return $2 if $2;
    return;
};
1;
