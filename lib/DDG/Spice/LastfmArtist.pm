package DDG::Spice::LastfmArtist;
# ABSTRACT: Search for musicians in Last.fm and get artists or bands similar to them.

use DDG::Spice;

spice to => 'http://ws.audioscrobbler.com/2.0/?format=json&method=artist.getinfo&artist=$1&api_key={{ENV{DDG_SPICE_LASTFM_APIKEY}}}&callback={{callback}}_$2';
spice from => '(?:([^/]*)/([^/]*)|)';

triggers any => 'similar', 'band', 'bands', 'musician', 'musicians', 'player', 'artist', 'artists', 'performer', 'performers', 'singer', 'singers', 'rapper', 'dj', 'rappers', 'vocalist', 'vocalists', 'djs', 'songster', 'songsters';

handle query_lc => sub {
    my $synonyms = "bands?|musicians?|players?|artists?|performers?|singers?|rappers?|djs?|vocalists?|songsters?";

    #Queries like "bands similar to incubus" or "artists similar ben folds"
    if(m{(?:$synonyms)\s+similar\s+(?:to\s+)?([^\s]+(?:\s+[^\s]+)*)}) {
        return $1, 'similar';
    } 
    #Queries like "similar bands to incubus" or "similar artists ben folds"
    if(m{similar\s+(?:$synonyms)\s+(?:to\s+)?([^\s]+(?:\s+[^\s]+)*)}) {
        return $1, 'similar';
    } 
    #Queries like "30 seconds to mars similar bands" or "ben folds similar musicians"
    if(m{([^\s]+(?:\s+[^\s]+)*)\s+similar\s+(?:$synonyms)}) {
        return $1, 'similar';
    }
    #Queries like "weezer band"
    if(m{([^\s]+(?:\s+[^\s]+)*)\s+(?:$synonyms)}) {
        return $1, 'all';
    }
    #Queries like "artist kanye west"
    if(m{(?:$synonyms)\s+([^\s]+(?:\s+[^\s]+)*)}) {
        return $1, 'all';
    }
    return;
};

1;
