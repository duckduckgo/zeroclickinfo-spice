package DDG::Spice::Lastfm::Events;
# ABSTRACT: Search for music shows near the user location.

use DDG::Spice;

spice to => 'http://ws.audioscrobbler.com/2.0/?format=json&method=geo.getevents&long=$1&lat=$2&api_key={{ENV{DDG_SPICE_LASTFM_APIKEY}}}&callback={{callback}}';
spice from => '(.*)/(.*)';

triggers query_lc => qr/^(?:concerts?|music shows?|shows?|gigs)(\s+(near|near me))?/;

primary_example_queries "concerts";
secondary_example_queries "shows near", "music shows near me", "gigs near";
description "Music show information";
name "LastfmEvents";
icon_url "/i/www.last.fm.ico";
source "Last.fm";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Lastfm/Events.pm";
topics "entertainment", "music";
category "entertainment";
attribution github => ['https://github.com/frncscgmz','frncscgmz'];

handle query_lc => sub {
   return ($loc->longitude, $loc->latitude);
};

1;
