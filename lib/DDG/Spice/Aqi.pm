package DDG::Spice::Aqi;
# ABSTRACT: Returns the current air quality index (AQI) read from airnow.gov for a given zip code within the US.

use DDG::Spice;

name "AQI";
description "Get current air quality indices";
source "AirNow";
primary_example_queries "aqi 10001";
category "physical_properties";
topics "geography", "science", "everyday";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Aqi.pm";
attribution github => ["https://github.com/schluchc", "Christian Schluchter"],
            twitter => ["https://twitter.com/CSchluchter", "CSchluchter"];

triggers startend => 'aqi';

spice to => 'http://www.airnowapi.org/aq/observation/zipCode/current/?format=application/json&zipCode=$1&API_KEY=1E504BD2-6E1A-4AFA-87CD-111EB038262F';

spice wrap_jsonp_callback => 1;

handle remainder => sub {
    return $_ if $_;
    return;
};

1;
