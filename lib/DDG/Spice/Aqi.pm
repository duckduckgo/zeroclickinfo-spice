package DDG::Spice::Aqi;
# ABSTRACT: Returns the current air quality index (AQI) read from airnow.gov for a given zip code within the US.

use DDG::Spice;
use Scalar::Util qw(looks_like_number);

name "AQI";
description "Get current air quality indices";
source "AirNow";
primary_example_queries "aqi 10001";
category "physical_properties";
topics "geography", "science", "everyday";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Aqi.pm";
attribution github => ["https://github.com/schluchc", "Christian Schluchter"],
            twitter => ["https://twitter.com/CSchluchter", "CSchluchter"];

triggers startend => "aqi", "air quality", "air quality index", "air pollution";

spice to => 'http://www.airnowapi.org/aq/observation/zipCode/current/?format=application/json&zipCode=$1&API_KEY={{ENV{DDG_SPICE_AQI_APIKEY}}}';

spice wrap_jsonp_callback => 1;

handle remainder => sub {
    #remainder is ok if it is a 5 digit number
    return $_ if ($_ && looks_like_number($_) && 9999 < $_ && $_ < 100000);
    return;
};

1;
