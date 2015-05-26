package DDG::Spice::GetEvents::Nearby;
#ABSTRACT: Returns events near the user's location.

use DDG::Spice;

primary_example_queries "events near me";
description "Upcoming events from GetEvents";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/GetEvents/Nearby.pm";
category "entertainment";
topics "computing","entertainment","food_and_drink","music","science","special_interest","travel";

triggers startend => 'events near me';
spice to => 'https://api.getevents.co/ddg?lat=$1&lng=$2&timezone=$3' ;

# Extract the geo location from the result returned by the handler: two real numbers seperated by '/' and after them a time zone also seperated by a '/'.
spice from => '([^/]+)/([^/]+)/(.*)';
spice wrap_jsonp_callback => 1;
spice is_cached => 1;

handle remainder => sub {
    # Verifying that $loc and the relevant geo attributes (longitude and latitude) are valid.
    return unless $loc && $loc->longitude && $loc->latitude && $loc->time_zone;

    my $lng = $loc->longitude;
    my $lat = $loc->latitude;
    my $tz = $loc->time_zone;
    return $lat, $lng, $tz;
};
1;
