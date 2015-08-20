package DDG::Spice::IslamicPrayerTimes;
# ABSTRACT: Shows Islamic prayer times according to given or user's current location and time

use strict;
use DDG::Spice;
use Text::Trim;

spice is_cached => 1;

name "IslamicPrayerTimes";
description "Islamic prayer times for the current day and given location";
primary_example_queries "islamic prayer times", "fethiye namaz times", "salat times in dc", "namaz times for san marino";
category "time_sensitive";
topics "special_interest", "everyday";

code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/IslamicPrayerTimes.pm";
attribution github  => ["https://github.com/ozdemirburak", "Burak Özdemir"],
            twitter => ["https://twitter.com/ozdemirbur", "Burak Özdemir"],
            web     => ["http://burakozdemir.co.uk", "Burak Özdemir"];

spice to => 'http://muslimsalat.com/$1/weekly.json?key={{ENV{DDG_SPICE_MUSLIMSALAT_APIKEY}}}&callback={{callback}}';

triggers startend => 'islamic prayer times', 'namaz times', 'salat times';

# Handle statement
handle remainder => sub {
    # set properties according to user's current location if there are no words but only triggers
    if ($_ eq '') {
        # return if location can't be retrieved
        return unless $loc and $loc->city;
        # return joined, city, region and country names
        my @location = ();
        push(@location, $loc->city);
        if ($loc->region_name) {
           push(@location, $loc->region_name);
        }
        if ($loc->country_name) {
           push(@location, $loc->country_name);
        }
        return join(',', @location);
    }
    # get city, state or country from the query
    my $city = $_;
    my @conjunctions = ("in", "of", "for", "at", "by", "near");
    my ($rx) = map qr/(?:$_)/, join "|", map qr/\b\Q$_\E\b/, @conjunctions;
    # remove conjunctions from string
    $city =~ s/$rx//g;
    return trim($city);
};

1;