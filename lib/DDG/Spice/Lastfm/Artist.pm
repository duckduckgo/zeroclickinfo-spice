package DDG::Spice::Lastfm::Artist;
# ABSTRACT: Search for musicians in Last.fm and get artists or bands similar to them.

use strict;
use DDG::Spice;

spice to => 'http://ws.audioscrobbler.com/2.0/?format=json&method=artist.getinfo&artist=$1&autocorrect=1&api_key={{ENV{DDG_SPICE_LASTFM_APIKEY}}}&callback={{callback}}_$2';
spice from => '(?:([^/]*)/([^/]*)|)';

triggers any => 'band', 'bands', 'musician', 'musicians', 'artists', 'performer', 'performers', 'singer', 'singers', 'rapper', 'dj', 'rappers', 'vocalist', 'vocalists', 'djs', 'songster', 'songsters';



handle query_lc => sub {
    my $synonyms = "bands?|musicians?|players?|artists?|performers?|singers?|rappers?|djs?|vocalists?|songsters?";

    # ignoring queries that has 'similar' in them
    return if $_ =~ m/\bsimilar\b/;

    #Ignore Queries like "apple watch bands"
    if(m{watch\ bands?}) {
        return;
    }
    #Special case for DJs (or artists/bands named DJ)
    if(m{^(?:djs?)\s+(\S+(?:\s+\S+)*)}) {
        return "dj $1", 'all';
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
