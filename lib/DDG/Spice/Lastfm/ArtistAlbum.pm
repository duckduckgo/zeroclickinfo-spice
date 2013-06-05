package DDG::Spice::Lastfm::ArtistAlbum;
# ABSTRACT: Get the albums of a musician.

use DDG::Spice;

primary_example_queries "albums from Ben Folds";
description "Top albums from an artist";
name "LastfmArtistAlbum";
icon_url "/i/www.last.fm.ico";
source "Last.fm";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Lastfm/ArtistAlbum.pm";
topics "entertainment", "music";
category "entertainment";
attribution github => ['https://github.com/jagtalon','Jag Talon'],
           twitter => ['http://twitter.com/juantalon','Jag Talon'];

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
