package DDG::Spice::Parking;
# ABSTRACT: Search for parking on parkingpanda.com

use strict;
use DDG::Spice;
use Text::Trim;

triggers any => 'parking panda', 'parkingpanda', 'parking', 'to park';

spice to => 'https://www.parkingpanda.com/api/v2/Locations/?ref=duckduck&search=$1&defaultSearch=$2';
spice wrap_jsonp_callback => 1;
spice proxy_cache_valid => '200 304 30m';
spice from => '(.+?)/(.+)';

handle remainder => sub {
    return unless $_;    # Guard against "no answer"

    # Remove nouns of types of parking spaces.
    s/\b(garages?|decks?|ramps?|lots?|spots?|spaces?)\b//i;

    # Remove anything before these prepositions.
    s/.*\b(in|near|for|at|by|around)\b\s*(.*)/$2/i;

    trim();

    # Confirm we still have something to search.
    return unless m/^\w+/;

    # If we have it, include the users local timezone and make a default search.
    if ($loc && $loc->time_zone){
        return $_, $loc->time_zone;
    }

    return $_;
};

1;
