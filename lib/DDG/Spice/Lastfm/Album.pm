package DDG::Spice::Lastfm::Album;
# ABSTRACT: Display album info.

use DDG::Spice;

spice to => 'http://ws.audioscrobbler.com/2.0/?format=json&method=album.getinfo&album=$1&autocorrect=1&artist=$2&api_key={{ENV{DDG_SPICE_LASTFM_APIKEY}}}&callback={{callback}}';
spice from => '(?:([^/]*)/([^/]*)|)';

triggers query_lc => qr/^(\S+(?:\s+\S+)*)\s+(?:albums?|records?|cds?)\s+(?:by|from)?\s+(\S+(?:\s+\S+)*)$/;

primary_example_queries "American Idiot album by Green Day";
description "Shows album information";
name "LastfmAlbum";
icon_url "/i/www.last.fm.ico";
source "Last.fm";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Lastfm/Album.pm";
topics "entertainment", "music";
category "entertainment";
attribution github => ['https://github.com/jagtalon','Jag Talon'],
           twitter => ['http://twitter.com/juantalon','Jag Talon'];

handle matches => sub {
    if($1 and $2) {
        return $1, $2;
    }
    return;
};

1;
