package DDG::Spice::SeatGeek::EventsByCity;
# ABSTRACT: Returns upcoming concerts in a city

use strict;
use DDG::Spice;

triggers start =>
    'upcoming concert in',
    'upcoming concerts in',
    'concerts in',
    'live in',
    'live shows in',
    'shows in',
    'gigs in';

spice proxy_cache_valid => "200 304 12h";

spice to => 'http://api.seatgeek.com/2/events?taxonomies.name=concert&per_page=20&venue.city=$1&callback={{callback}}';

handle remainder_lc => sub {
    # Return if this is a geolocation search
    return if $_ =~ "^my area";

    # Replaces spaces between words with dashes, because the API requires it
    $_ =~ s/\s/\-/g;
    return $_ if $_;
    return;
};

1;
