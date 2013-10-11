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

    # Infer location if not explicitly in the query.
    $location = $loc->loc_str unless ($location);

    return $location;
};

1;
