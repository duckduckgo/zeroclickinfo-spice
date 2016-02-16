package DDG::Spice::Forecast;
# ABSTRACT: Weather forecasts

use strict;
use DDG::Spice;
use Text::Trim;

triggers start => "weather", "forecast", "weather forecast";

spice from => '([^/]*)/?([^/]*)';
spice to => 'http://forecast.io/ddg?apikey={{ENV{DDG_SPICE_FORECAST_APIKEY}}}&q=$1&callback={{callback}}';

# cache DDG Rewrite for 24 hours and
# API responses with return code 200 for 30 minutes
spice is_cached => 1;
spice proxy_cache_valid => "200 30m";

my @locs = qw (city region_name country_name );

handle remainder => sub {

    return if $_;

    my $loc_str = join " ", map { $loc->{$_} } @locs;
    return $loc_str, 'current', {is_cached => 0};
};

# 2015.03.17 tommytommytommy:
# This IA overtriggers because we don't have a way to check that
# the string following "weather" is an actual location.
# For now, limit this IA to only trigger when the query is "weather", and
# only send the user's location string.
#
# If the user specifies a location, we will try to internally infer
# that location and make the appropriate upstream request.
# When we have implemented places detection, we can restore the relevancy and triggering
# functionality for this module by removing the block above and uncommenting
# all the relevant lines.

1;
