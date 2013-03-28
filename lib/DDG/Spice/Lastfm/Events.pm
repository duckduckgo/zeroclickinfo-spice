package DDG::Spice::Lastfm::Events;

use DDG::Spice;

spice to => 'http://ws.audioscrobbler.com/2.0/?format=json&method=geo.getevents&lat=$1&long=$2&api_key=d26f0dc7944e0282b4ea1bbfb7521064&callback={{callback}}';

spice from => '(\-?\d+\.\d+?)\/(\-?\d+\.\d+?)';

triggers query_lc => qr/^(?:concerts?|music shows?|shows?|gigs)\s+(?:near?|near me)/;

handle query_lc => sub {
   #my $lat = $loc->latitude;
   #my $lon = $loc->longitude;
   #return ($lat, $lon);

   return ($loc->latitude,$loc->longitude);
};

1;
