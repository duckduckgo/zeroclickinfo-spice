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


my @triggers = ('forecast', 'forcast', 'weather', 'temp', 'temperature', 'meteo');
triggers startend => @triggers;

spice from => '([^/]*)/?([^/]*)';
spice to => 'http://forecast.io/ddg?apikey={{ENV{DDG_SPICE_FORECAST_APIKEY}}}&q=$1&callback={{callback}}';

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
    
    # bbc
    # shipping forecast, bbc forecast, bbc weather forecast etc.
    return if /\b((shipping\s+fore?cast)|((weather|fore?cast)\sbbc$)|(^bbc\s.*(weather|fore?cast))|(\s+bbc\s+))\b/;

    # has quotes
    return if /(%22)|\"/;

    # has financialish terms
    return if /\b(financ(e|ial)|market|bond|treasury|pension|fund|t-?bill|stock|government|strateg(y|ies)|analytics|market|fore?cast(ing|or|er))\b/;
    return if /\b(gold|silver|oil|naturalgas|palladium|platinum|copper|lead|zinc|tin|aluminium|aluminum|nickel|cobalt|molybdenum|polypropylene|ethanol)\b.*(fore?cast)/;

    # sports
    return if /\b(football|golf|soccer|tennis|basketball|hockey|nba|ncaa|nfl|nhl)\b/;

    # has other terms
    return if (/\b((^site\:)|http|(\.(org|com|net))|underground)\b/);

    # color temperature && critical temperature
    if (/\btemp(era?ture)?\b/) {
        return if /\b(colou?r|[0-9]+\s*[kK])\b/;
        return if /\bcritical temp(era?ture)?\b/;
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
