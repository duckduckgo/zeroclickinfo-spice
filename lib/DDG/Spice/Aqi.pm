package DDG::Spice::Aqi;
# ABSTRACT: Returns the current air quality index (AQI) read from airnow.gov for a given zip code within the US.

use DDG::Spice;

triggers startend => "aqi", "air quality", "air quality index", "air pollution";

spice to => 'http://www.airnowapi.org/aq/observation/zipCode/current/?format=application/json&zipCode=$1&API_KEY={{ENV{DDG_SPICE_AQI_APIKEY}}}';

spice wrap_jsonp_callback => 1;

handle remainder => sub {
     my $query = shift;
     return unless $query =~ qr/^\d{5}$/; #check if the entire remainder string is a 5 digits number;
     return $query; # we know it exists, it's a number and it has 5 digits;
};

1;
