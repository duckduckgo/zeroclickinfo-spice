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

triggers any => 'forecast', 'forcast', 'weather', 'temp', 'temperature';


spice to => 'http://forecast.io/ddg?apikey={{ENV{DDG_SPICE_FORECAST_APIKEY}}}&q=$1&callback={{callback}}';

spice is_cached => 0;

# 'weather' query itself can't be cached
spice proxy_cache_valid   => "418 1s";

handle query_lc => sub{
    my $location = '';
    
    if (/^(?:what(?:'s| is) the |)(?:(?:weather|temp(?:erature|)) (?:fore?cast |report |today |tomm?orr?ow |this week |))+(?:in |for |at |)(.*)/) {
        $location = $1 unless ($1 =~ /fore?cast|report|weather|temp(erature)/);
    }

    $location = $loc->loc_str unless ($location);

    return $location;
};

1;
