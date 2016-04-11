package DDG::Spice::SeatGeek::EventsNearMe;
# ABSTRACT: Returns upcoming concerts based on geolocation

use strict;
use DDG::Spice;

triggers start =>
    'upcoming concert',
    'upcoming concerts',
    'concerts',
    'live',
    'live shows',
    'shows',
    'gigs';

spice proxy_cache_valid => "418 1d";
spice is_cached => 0;

spice to => 'https://api.seatgeek.com/2/events?taxonomies.name=concert&per_page=20&lat=$1&lon=$2&range=50mi&&callback={{callback}}';
spice from => '([\-0-9.]+)/([\-0-9.]+)';

handle remainder_lc => sub {
    # regex guard - remainder should always have "in my area" or "near me"
    return if $_ !~ /(in my area|near me|nearby)$/;

    # only make request if geolocation data's available
    if ($loc && $loc->latitude && $loc->longitude) {
        return $loc->latitude, $loc->longitude;
    }

    return;
};

1;
