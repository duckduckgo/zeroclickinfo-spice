package DDG::Spice::GetEvents;
#ABSTRACT: Returns events near the user's location.

use DDG::Spice;

#Attribution
primary_example_queries "events near me";
description "Upcoming events from GetEvents";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/GetEvents.pm";
category "entertainment";
topics "computing","entertainment","food_and_drink","music","science","special_interest","travel";

#Triggers
triggers startend => 'events near me';
                                                                                                                                                                                                                                  
spice to => 'https://api.getevents.co/event?lat=$1&lng=$2&limit=10';
# Extract the geo location from the result returned by the handler: two real numbers seperated by '/'.
spice from => '(?:([-+]?[0-9]*\.?[0-9]+)\/([-+]?[0-9]*\.?[0-9]+)|)';
spice wrap_jsonp_callback => 1;
spice is_cached => 1;

#Handle statement                                                                                                                                                                                                                                  
handle remainder => sub {
    # Verifying that $loc and the relevant geo attributes (longitude and latitude) are valid.
    return unless $loc && $loc->longitude && $loc->latitude;

    my $lng = $loc->longitude;
    my $lat = $loc->latitude;
    return $lat, $lng;
};
1;
