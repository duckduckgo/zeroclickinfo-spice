package DDG::Spice::Forecast;
# ABSTRACT: Weather forecasts

use strict;
use utf8;
use DDG::Spice;
use Text::Trim;

triggers startend => "weather", "forecast", "weather forecast", "weer", "meteo", "wetter", "clima", "tiempo", "météo", "天気", "天气", "pogoda", "vejr", "vêr", "väder", "tempo", "време", "времето", "погода", "райы", "καιρός", "tiempu", "ilm", "eguraldi", "laiks", "եղանակ", "počasie", "sää", "hava durumu";

spice from => '([^/]*)/?([^/]*)';
spice to => 'https://darksky.net/ddg?apikey={{ENV{DDG_SPICE_FORECAST_APIKEY}}}&q=$1&callback={{callback}}&lang=$2';

# cache DDG Rewrite for 24 hours and
# API responses with return code 200 for 30 minutes
spice is_cached => 1;
spice proxy_cache_valid => "200 30m";

spice alt_to => {
    forecast_daily => {
        to => 'https://api.darksky.net/forecast/{{ENV{DDG_SPICE_FORECAST_DAILY_APIKEY}}}/$1,$2,$3?exclude=currently,flags',
        from => '([^\/]+)/([^\/]+)/(.+)'
    }
};

my @locs = qw (city region_name country_name );
my @extra_words = sort { length $b <=> length $a } ("local", "near me", "nearby me", "current");
my $extra_words_qr = join "|", @extra_words;

handle remainder => sub {

    s/\b$extra_words_qr\b//;

    return if $_;

    my $loc_str = join " ", map { $loc->{$_} } @locs;

    # Default to English
    my $parsed_lang = 'en';
    # And try to extract language from locale
    if ($lang && $lang->locale) {
        ($parsed_lang) = $lang->locale =~ /^([a-z]{2})_/;
    }
    return $loc_str, $parsed_lang, {is_cached => 0};
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
