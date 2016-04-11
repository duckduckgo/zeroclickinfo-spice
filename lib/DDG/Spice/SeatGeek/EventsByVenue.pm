package DDG::Spice::SeatGeek::EventsByVenue;
# ABSTRACT: Returns upcoming concerts at a venue

use strict;
use DDG::Spice;

triggers start =>
    'upcoming concert at',
    'upcoming concerts at',
    'concerts at',
    'live at',
    'live shows at',
    'shows at',
    'gigs at';

spice proxy_cache_valid => "200 304 12h";

spice to => 'https://api.seatgeek.com/2/events?taxonomies.name=concert&per_page=20&venue.slug=$1&callback={{callback}}';

handle remainder_lc => sub {
    # Replaces spaces between words with dashes, because the API requires it
    $_ =~ s/\s/\-/g;
    return $_ if $_;
    return;
};

1;
