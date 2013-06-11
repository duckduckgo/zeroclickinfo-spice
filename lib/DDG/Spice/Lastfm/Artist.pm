package DDG::Spice::Lastfm::Artist;
# ABSTRACT: Search for musicians in Last.fm and get artists or bands similar to them.

use DDG::Spice;

primary_example_queries "ben folds five artist";
secondary_example_queries "kanye west rapper", "bands similar to incubus", "weezer band", "musicians similar to lady gaga";
description "Musician information";
name "LastFM Artist";
icon_url "/i/www.last.fm.ico";
source "Last.fm";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Lastfm/Artist.pm";
topics "entertainment", "music";
category "entertainment";
attribution github => ['https://github.com/jagtalon','Jag Talon'],
           twitter => ['http://twitter.com/juantalon','Jag Talon'];

spice to => 'http://ws.audioscrobbler.com/2.0/?format=json&method=artist.getinfo&artist=$1&autocorrect=1&api_key={{ENV{DDG_SPICE_LASTFM_APIKEY}}}&callback={{callback}}_$2';
spice from => '(?:([^/]*)/([^/]*)|)';

triggers any => 'similar', 'band', 'bands', 'musician', 'musicians', 'player', 'artist', 'artists', 'performer', 'performers', 'singer', 'singers', 'rapper', 'dj', 'rappers', 'vocalist', 'vocalists', 'djs', 'songster', 'songsters';



handle query_lc => sub {
    my $synonyms = "bands?|musicians?|players?|artists?|performers?|singers?|rappers?|djs?|vocalists?|songsters?";

    #Queries like "bands similar to incubus" or "artists similar ben folds"
    if(m{(?:$synonyms)\s+similar\s+(?:to\s+)?(\S+(?:\s+\S+)*)}) {
        return $1, 'similar';
    }
    #Queries like "similar bands to incubus" or "similar artists ben folds"
    if(m{similar\s+(?:$synonyms)\s+(?:to\s+)?(\S+(?:\s+\S+)*)}) {
        return $1, 'similar';
    }
    #Queries like "30 seconds to mars similar bands" or "ben folds similar musicians"
    if(m{(\S+(?:\s+\S+)*)\s+similar\s+(?:$synonyms)}) {
        return $1, 'similar';
    }
    #Queries like "weezer band"
    if(m{(\S+(?:\s+\S+)*)\s+(?:$synonyms)}) {
        return $1, 'all';
    }
    #Queries like "artist kanye west"
    if(m{(?:$synonyms)\s+(\S+(?:\s+\S+)*)}) {
        return $1, 'all';
    }
    return;
};

1;
