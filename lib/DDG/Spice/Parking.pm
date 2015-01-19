package DDG::Spice::Parking;
# ABSTRACT: Search for parking on parkingpanda.com

use DDG::Spice;
use Text::Trim;
use DateTime;

name 'Parking';
source 'ParkingPanda';
icon_url 'https://www.parkingpanda.com/content/images/favicon.ico';
description 'Search for parking';
primary_example_queries 'parking san francisco', 'baltimore md parking', 'parking near radio city music hall';
secondary_example_queries 'where to park near fenway park', 'parking panda washington dc';
category 'location_aware';
topics 'everyday', 'travel', 'entertainment', 'special_interest';
code_url 'https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Parking.pm';
attribution github => ['AlexCutlipParkingPanda', 'Alex Cutlip'],
            email  => ['alex@parkingpanda.com',  'Alex Cutlip'];

triggers any => 'parking panda', 'parkingpanda', 'parking', 'to park';

spice to => 'http://www.parkingpanda.com/api/v2/Locations/?ref=duckduck&search=$1&defaultSearch=$2';
spice wrap_jsonp_callback => 1;
spice proxy_cache_valid => '200 304 30m';
spice from => '([^/]+)/?(?:([^/]+)/?(?:([^/]+)|)|)';

handle remainder => sub {      
    return unless $_;    # Guard against "no answer"
   
    # Remove nouns of types of parking spaces.
    s/\b(garages?|decks?|ramps?|lots?|spots?|spaces?)\b//i;
    
    # Remove anything before these prepositions.
    s/.*\b(in|near|for|at|by|around)\b\s*(.*)/$2/i;
    
    trim();
    
    # Confirm we still have something to search.
    return unless m/^\w+/;
    
    # If we have it, include the users local time and make a default search.    
    if ($loc && $loc->time_zone){
        my $time = DateTime->now();
        $time->set_time_zone( $loc->time_zone );    
        return $_, $time;
    }
    
    return $_, '';
};

1;
