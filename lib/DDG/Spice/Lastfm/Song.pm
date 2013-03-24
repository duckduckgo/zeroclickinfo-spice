package DDG::Spice::Lastfm::Song;
# ABSTRACT: Display song info.

use DDG::Spice;

spice to => 'http://ws.audioscrobbler.com/2.0/?format=json&method=track.getinfo&track=$1&artist=$2&autocorrect=1&api_key={{ENV{DDG_SPICE_LASTFM_APIKEY}}}&callback={{callback}}';
spice from => '(?:([^/]*)/([^/]*)|)';

triggers query_lc => qr/ ^
						 ([^\s]+(?:\s+[^\s]+)*)\s+
						 (?:tracks?|songs?|music)\s+
						 (?:by|from)\s+
						 ([^\s]+(?:\s+[^\s]+)*)
						 $|^
						 (?:listen(?:\s+to)?)\s+
						 ([^\s]+(?:\s+[^\s]+)*)\s+
						 (?:by|from)\s+
						 ([^\s]+(?:\s+[^\s]+)*)
						 $/x;

primary_example_queries "Payphone song by Maroon 5";
description "Song information";
name "LastfmSong";
icon_url "/i/www.last.fm.ico";
source "Last.fm";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Lastfm/Song.pm";
topics "entertainment", "music";
category "entertainment";
attribution github => ['https://github.com/jagtalon','Jag Talon'],
           twitter => ['http://twitter.com/juantalon','Jag Talon'];

handle matches => sub {
    if($1 && $2) {
        return $1, $2;
    } elsif($3 && $4) {
    	return $3, $4;
    }
    return;
};

1;
