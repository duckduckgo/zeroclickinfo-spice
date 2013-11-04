package DDG::Spice::Forecast;

use Data::Dumper;

use DDG::Spice;

name "Forecast";
description "Weather forecast";
source "Forecast";
primary_example_queries "weather";
secondary_example_queries "weather 12180";
topics "everyday", "travel";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Forecast.pm";


my @triggers = ('forecast', 'forcast', 'weather', 'temp', 'temperature');
triggers any => @triggers;

spice to => 'http://forecast.io/ddg?apikey={{ENV{DDG_SPICE_FORECAST_APIKEY}}}&q=$1&callback={{callback}}';

# DDG cache off by default and cache API responses
# with return code 200 for 30 minutes
spice is_cached => 0;
spice proxy_cache_valid   => "200 30m";

handle query_lc => sub {
    my $location;

    # Capture user defined location if it exists.
    if (/^(?:what(?:'s| is) the |)(?:(?:weather|temp(?:erature|)) (?:fore?cast |report |today |tomm?orr?ow |this week |))+(?:in |for |at |)(.*)/) {
        $location = $1 unless ($1 =~ /fore?cast|report|weather|temp(erature)/);
    }

    # 10/29/2013 russell double check for things we don't want
    
    # bbc
    # shipping forecast, bbc forecast, bbc weather forecast etc.
    return if /(shipping\s+fore?cast)|((weather|fore?cast)\sbbc$)|(^bbc\s.*(weather|fore?cast))|(\s+bbc\s+)/;

    # has quotes
    return if /(%22)|\"/;

    # has financialish terms
    return if /market|bond|treasury|pension|fund|t-?bill|stock|government|strateg(y|ies)|analytics|market|fore?cast(ing|or|er)/;
    return if /(gold|silver|oil|naturalgas|palladium|platinum|copper|lead|zinc|tin|aluminium|aluminum|nickel|cobalt|molybdenum|polypropylene|ethanol).*(fore?cast)/;

    # sports
    return if /football|golf|soccer|tennis|basketball|hockey|nba|ncaa|nfl|nhl/;

    # has other terms
    return if (/(^site\:)|http|(\.(org|com|net))/);

    # Infer location if not explicitly in the query.
    $location = $loc->loc_str unless ($location);

    return $location;
};

1;
