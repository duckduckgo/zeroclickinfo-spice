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

triggers start => "apod", "astronomy image of day", "astronomy images of day", "astronomy image today", "astronomy images today", "astronomy image of the day", "astronomy images of the day", "astrophoto image of day", "astrophoto images of day", "astrophoto image today", "astrophoto images today", "astrophoto image of the day", "astrophoto images of the day", "astronomy photo of day", "astronomy photos of day", "astronomy photo today", "astronomy photos today", "astronomy photo of the day", "astronomy photos of the day", "astronomy picture of day", "astronomy pictures of day", "astronomy picture today", "astronomy pictures today", "astronomy picture of the day", "astronomy pictures of the day", "astrophoto picture of day", "astrophoto pictures of day", "astrophoto picture today", "astrophoto pictures today", "astrophoto picture of the day", "astrophoto pictures of the day", "astrophotos image of day", "astrophotos images of day", "astrophotos image today", "astrophotos images today", "astrophotos image of the day", "astrophotos images of the day", "astrophotos picture of day", "astrophotos pictures of day", "astrophotos picture today", "astrophotos pictures today", "astrophotos picture of the day", "astrophotos pictures of the day";

spice to => 'http://www.astrobin.com/api/v1/imageoftheday/?limit=1&api_key={{ENV{DDG_SPICE_ASTROBIN_APIKEY}}}&api_secret={{ENV{DDG_SPICE_ASTROBIN_APISECRET}}}&format=json$1';
spice proxy_cache_valid => "200 60m";
spice wrap_jsonp_callback => 1;

handle remainder => sub {
        return '';
};	
1;
