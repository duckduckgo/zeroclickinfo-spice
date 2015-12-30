package DDG::Spice::Tides;
# ABSTRACT: High and Low Tide prediction for your location

use DDG::Spice;

spice is_cached => 1; #we can cache the response and just filter out the tide events that have already happened on the front

name "Tides";
source "WUnderground";
icon_url "/i/wunderground.com.ico";
description "Get high and low tide times for your location or zip code";
primary_example_queries "tides", "tide 02201";
secondary_example_queries "when is high tide?";
category "location_aware";
topics "special_interest", "geography", "travel";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Tides.pm";
attribution github => ["mattr555", "Matt Ramina"],
            twitter => "mattr555";

spice to => 'http://api.wunderground.com/api/{{ENV{DDG_SPICE_WUNDERGROUND_APIKEY}}}/tide/q/$1.json?callback={{callback}}';

triggers any => "tide", "tides";

handle remainder => sub {
    s/(when is|high|low|\?|\s)//g;
    return unless $_ eq '' || m/^\d{5}$/;

    if ((defined $loc && defined $loc->latitude && defined $loc->longitude) || $_){
        return join(',', $loc->latitude, $loc->longitude) if $_ eq '';
        return $_;
    }
    return;
};

1;
