package DDG::Spice::IslamicPrayerTimes;
# ABSTRACT: Shows Islamic prayer times according to user's current location and time

use strict;
use DateTime;
use Date::Parse;
use DDG::Spice;

spice is_cached => 1;
spice proxy_cache_valid => "200 12h";

name "IslamicPrayerTimes";
description "Islamic prayer times for the current day and location";
primary_example_queries "islamic prayer times", "namaz times";
category "time_sensitive";
topics "special_interest", "everyday";

code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/IslamicPrayerTimes.pm";
attribution github  => ["https://github.com/ozdemirburak", "Burak Özdemir"],
            twitter => ["https://twitter.com/ozdemirbur", "Burak Özdemir"],
            web     => ["http://burakozdemir.co.uk", "Burak Özdemir"];

spice to => 'http://api.aladhan.com/timings/$1?latitude=$2&longitude=$3&timezonestring=$4';
spice from => "(.*)/(.*)/(.*)/(.*)";
spice wrap_jsonp_callback => 1;

triggers start => 'islamic prayer times', 'namaz times';

# Handle statement
handle remainder => sub {
    # return if there are words after the triggers
    return unless $_ eq '';
    # return if location can't be retrieved
    return unless $loc && $loc->latitude && $loc->longitude && $loc->time_zone;

    # variables needed for api call
    my $latitude = $loc->latitude;
    my $longitude = $loc->longitude;
    my $timezone = $loc->time_zone;
    # set the timestamp according to user's location
    my $datetime = DateTime->now;
    $datetime->set_time_zone($timezone);
    my $timestamp = str2time($datetime);

    return $timestamp, $latitude, $longitude, $timezone;
};

1;