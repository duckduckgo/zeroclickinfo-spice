package DDG::Spice::Forecast;
# ABSTRACT: Weather forecasts

use strict;
use DDG::Spice;
use Text::Trim;

name "Forecast";
description "Weather forecast";
source "Forecast";
primary_example_queries "weather";
secondary_example_queries "weather 12180";
topics "everyday", "travel";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Forecast.pm";

# my @forecast_words = qw(weather);
# my @triggers = (@forecast_words);
# triggers startend => @triggers;
triggers startend => "weather";

spice from => '([^/]*)/?([^/]*)';
spice to => 'http://forecast.io/ddg?apikey={{ENV{DDG_SPICE_FORECAST_APIKEY}}}&q=$1&callback={{callback}}';

# # skip synonyms for "weather" because of overtriggering
# my @weather_synonyms =qw(forecast);
# my @bbc_words     = qw(bbc shipping);
# my @finance_words = qw(sales finance financial market bond treasure pension fund tbill t-bill stock government strategy strategies analytics market);
# my @commodities_words = (
#     'gold',     'silver', 'oil',    'naturalgas', 'natural gas',   'palladium',
#     'platinum', 'copper', 'lead',   'zinc',       'tin',           'aluminium',
#     'aluminum', 'nickel', 'cobalt', 'molybdenum', 'polypropylene', 'ethanol'
# );
# my @sports_words = map { ($_, $_ . ' game', $_ . ' match') } qw(football golf soccer tennis basketball hockey nba ncaa nfl nhl cricket);
# 
# my $skip_words = join('|', @bbc_words, @finance_words, @commodities_words, @sports_words, @weather_synonyms);
# my $forecasts = join('|', @forecast_words);
# my $skip_forecasts_re = qr/(?:\b(?:$skip_words)\s+(?:$forecasts)\b)|(?:\b(?:$forecasts)\s+(?:$skip_words)\b)/;

# cache DDG Rewrite for 24 hours and
# API responses with return code 200 for 30 minutes
spice is_cached => 1;
spice proxy_cache_valid => "200 30m";

# my $no_location_qr = qr/fore?cast|report|meteo|weather|temp(?:erature)/;
# my $weather_qr = qr/(?:(?:weather|temp(?:erature|)|fore?cast|meteo)(?: fore?cast| report| today| tomm?orr?ow| this week| monday| tuesday|  wednesday| thursday| friday| saturday| sunday| lundi| mardi| mercredi| jeudi| vendredi| samedi| dimanche| demain|))+/;

handle remainder => sub {

    return if $_;

    my $location = $loc->loc_str;
    return $location, 'current', {is_cached => 0};
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

# handle query_lc => sub {
#    my $location = '';
#
#    # Capture user defined location if it exists.
#    if (/^(?:what(?:'s| is) the |)(?:(?:current|local) )?$weather_qr(?: in | for | at |)(.*)/) {
#        $location = $1 unless ($1 =~ $no_location_qr);
#
#    } elsif (/^(.*?)(?:(?:current|local) )?$weather_qr/) {
#        $location = $1 unless ($1 =~ $no_location_qr);
#    }
#
#    # 10/29/2013 russell double check for things we don't want
#    $location = trim $location if $location;
#
#    # has quotes
#    return if /(%22)|\"/;
#
#    # has defined forecast/weather skip
#    return if /$skip_forecasts_re/;
#
#    # has other terms
#    return if (/\b((^site\:)|http|(\.(org|com|net))|underground|map|app)s?\b/);
#
#    # color temperature && critical temperature && operating temperature
#    if (/\btemp(era?ture)?\b/) {
#        return if /\b(colou?r|[0-9]+\s*[kK])\b/;
#        return if /\bcritical temp(era?ture)?\b/;
#        return if /\boperating temp(era?ture)?\b/;
#    }
#
#    # Don't cache generic queries due to
#    # variations in the users location.
#    if ($location) {
#        return $location;
#    } else {
#        $location = $loc->loc_str;
#        return $location, 'current', {is_cached => 0};
#    }
#};

1;
