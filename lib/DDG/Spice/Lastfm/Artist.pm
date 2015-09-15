package DDG::Spice::Lastfm::Artist;
# ABSTRACT: Search for musicians in Last.fm and get artists or bands similar to them.

use strict;
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

triggers any => 'band', 'bands', 'musician', 'musicians', 'artist', 'artists', 'performer', 'performers', 'singer', 'singers', 'rapper', 'dj', 'rappers', 'vocalist', 'vocalists', 'djs', 'songster', 'songsters';



handle query_lc => sub {
    my $synonyms = "bands?|musicians?|players?|artists?|performers?|singers?|rappers?|djs?|vocalists?|songsters?";

    # ignoring queries that has 'similar' in them
    return if $_ =~ m/\bsimilar\b/;

    #Ignore Queries like "apple watch bands"
    if(m{watch\ bands?}) {
        return;
    }
    #Queries like "weezer band"
    if(m{(\S+(?:\s+\S+)*)\s+(?:$synonyms)$}) {
        return $1, 'all';
    }
    #Queries like "artist kanye west"
    if(m{^(?:$synonyms)\s+(\S+(?:\s+\S+)*)}) {
        return $1, 'all';
    }
    return;
};

1;
