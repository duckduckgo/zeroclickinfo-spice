package DDG::Spice::Lastfm::Events;
# ABSTRACT: Search for music shows near the user location.

use DDG::Spice;

spice to => 'http://ws.audioscrobbler.com/2.0/?format=json&method=geo.getevents&long=$1&lat=$2&api_key={{ENV{DDG_SPICE_LASTFM_APIKEY}}}&callback={{callback}}';
spice from => '(.*?)/(.*)';

triggers any => "concerts", "gig", "gigs", "shows";

handle query_lc => sub {
   return ($loc->longitude, $loc->latitude);
};

1;
