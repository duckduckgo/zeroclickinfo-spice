package DDG::Spice::Lastfm::Events;
# ABSTRACT: Search for music shows near the user location.

use DDG::Spice;

spice to => 'http://ws.audioscrobbler.com/2.0/?format=json&method=geo.getevents&lat=$1&long=$2&location=$3&api_key={{ENV{DDG_SPICE_LASTFM_APIKEY}}}&callback={{callback}}';

spice from => '(\-?\d+\.\d+?)\/(\-?\d+\.\d+?)';

triggers query_lc => qr/^(?:concerts?|music shows?|shows?|gigs)\s+near?(:?\s+(.*))?/;

primary_example_queries "concerts near";
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
   if($1) {
      my $city = $1;
      $city =~ s/^\s*(.*?)/$1/;
      return ("","",$city);
   } else {
      my $lat = $loc->latitude;
      my $lon = $loc->longitude;
      return ($lat, $lon,"");
   }
   return;
};

1;
