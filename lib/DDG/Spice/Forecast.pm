package DDG::Spice::Forecast;

use Data::Dumper;

use DDG::Spice;
use Text::Trim;

name "Forecast";
description "Weather forecast";
source "Forecast";
primary_example_queries "weather";
secondary_example_queries "weather 12180";
topics "everyday", "travel";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Forecast.pm";

my @temperatures = qw(temp temperature);
my @connectors   = qw(in for at);
my @descriptors  = qw(current);

my @temps_triggers;

foreach my $temp (@temperatures) {
    foreach my $conn (@connectors) {
        push @temps_triggers, $temp . ' ' . $conn;    # temperature for, temp at
        foreach my $desc (@descriptors) {
            push @temps_triggers, join(' ', $desc, $temp, $conn), $desc . ' ' . $temp;    # current temperature in; current temp
        }
    }
}

my @forecast_words = qw(forecast forcast weather);
my @triggers = (@forecast_words, @temps_triggers, 'meteo');
triggers startend => @triggers;

spice from => '([^/]*)/?([^/]*)';
spice to => 'http://forecast.io/ddg?apikey={{ENV{DDG_SPICE_FORECAST_APIKEY}}}&q=$1&callback={{callback}}';

my @bbc_words     = qw(bbc shipping);
my @finance_words = qw(sales finance financial market bond treasure pension fund tbill t-bill stock government strategy strategies analytics market);
my @commodities_words = (
    'gold',     'silver', 'oil',    'naturalgas', 'natural gas',   'palladium',
    'platinum', 'copper', 'lead',   'zinc',       'tin',           'aluminium',
    'aluminum', 'nickel', 'cobalt', 'molybdenum', 'polypropylene', 'ethanol'
);
my @sports_words = map { ($_, $_ . ' game', $_ . ' match') } qw(football golf soccer tennis basketball hockey nba ncaa nfl nhl cricket);

my $skip_words = join('|', @bbc_words, @finance_words, @commodities_words, @sports_words);
my $forecasts = join('|', @forecast_words);
my $skip_forecasts_re = qr/(?:\b(?:$skip_words)\s+(?:$forecasts)\b)|(?:\b(?:$forecasts)\s+(?:$skip_words)\b)/;

# cache DDG Rewrite for 24 hours and
# API responses with return code 200 for 30 minutes
spice is_cached => 1;
spice proxy_cache_valid => "200 30m";

my $no_location_qr = qr/fore?cast|report|meteo|weather|temp(?:erature)/;
my $weather_qr = qr/(?:(?:weather|temp(?:erature|)|fore?cast|meteo)(?: fore?cast| report| today| tomm?orr?ow| this week| monday| tuesday|  wednesday| thursday| friday| saturday| sunday| lundi| mardi| mercredi| jeudi| vendredi| samedi| dimanche| demain|))+/;

handle query_lc => sub {
    my $location = '';

    # Capture user defined location if it exists.
    if (/^(?:what(?:'s| is) the |)(?:(?:current|local) )?$weather_qr(?: in | for | at |)(.*)/) {
        $location = $1 unless ($1 =~ $no_location_qr);

    } elsif (/^(.*?)(?:(?:current|local) )?$weather_qr/) {
        $location = $1 unless ($1 =~ $no_location_qr);
    }

    # 10/29/2013 russell double check for things we don't want
    $location = trim $location if $location;

    # has quotes
    return if /(%22)|\"/;

    # has defined forecast/weather skip
    return if /$skip_forecasts_re/;

    # has other terms
    return if (/\b((^site\:)|http|(\.(org|com|net))|underground|map|app)s?\b/);

    # color temperature && critical temperature && operating temperature
    if (/\btemp(era?ture)?\b/) {
        return if /\b(colou?r|[0-9]+\s*[kK])\b/;
        return if /\bcritical temp(era?ture)?\b/;
        return if /\boperating temp(era?ture)?\b/;
    }

    # Don't cache generic queries due to
    # variations in the users location.
    if ($location) {
        return $location;
    } else {
        $location = $loc->loc_str;
        return $location, 'current', {is_cached => 0};
    }
};

1;
