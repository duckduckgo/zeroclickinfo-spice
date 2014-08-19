package DDG::Spice::Astrobin::Apod;
# ABSTRACT: Fetch Astronomy picture of day.

use DDG::Spice;

name "Apod";
source "http://www.astrobin.com";
description "Get astronomy image of day";
primary_example_queries "apod";
category "special";
topics "special_interest";
icon_url "http://www.astrobin.com/favicon.ico";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Apod/Apod.pm";
attribution github => ["https://github.com/killerfish", "Usman Raza"],
            twitter => ["https://twitter.com/f1shie", "Usman Raza"];

triggers start => "apod", "astronomy image of day", "astronomy picture of day", "astronomy picture of the day", "astronomy image of the day", "astronomy photo of the day", "astronomy photo of day";
spice to => 'http://www.astrobin.com/api/v1/imageoftheday/?limit=1&api_key={{ENV{DDG_SPICE_ASTROBIN_APIKEY}}}&api_secret={{ENV{DDG_SPICE_ASTROBIN_APISECRET}}}&format=json$1';
spice proxy_cache_valid => "200 60m";
spice wrap_jsonp_callback => 1;

handle remainder => sub {
        return '';
};	
1;
