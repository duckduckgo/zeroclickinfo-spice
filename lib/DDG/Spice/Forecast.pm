package DDG::Spice::Forecast;

use DDG::Spice;

name "Forecast";
description "Weather forecast";
source "Forecast";
primary_example_queries "weather";
secondary_example_queries "weather 12180";
topics "everyday", "travel";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Forecast.pm";

triggers query_lc => qr/^(?:weather(?: fore?cast)?|fore?cast)(?: (?:at|for|in))?(?: (.+))?$/;

spice to => 'https://forecast.io/ddg?apikey={{ENV{DDG_SPICE_FORECAST_APIKEY}}}&q=$1&callback={{callback}}';

spice is_cached => 0;

handle matches => sub {
  # If the user explicitly provided a location, nab it.
  my ($location) = @_;

  # Otherwise, use DDG's IP geocoding information.
  $location = "${\$loc->latitude},${\$loc->longitude}" unless($location);

  return $location;
};

1;
