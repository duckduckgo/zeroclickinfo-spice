package DDG::Spice::Astrobin::Apod;
# ABSTRACT: Fetch Astronomy picture of day.

use strict;
use DDG::Spice;

triggers start => "astronomy", "astrophoto";
triggers startend => "apod";

spice to => 'http://www.astrobin.com/api/v1/imageoftheday/?limit=1&api_key={{ENV{DDG_SPICE_ASTROBIN_APIKEY}}}&api_secret={{ENV{DDG_SPICE_ASTROBIN_APISECRET}}}&format=json$1';
spice proxy_cache_valid => "200 60m";
spice wrap_jsonp_callback => 1;

spice alt_to => {
	fetch_id => {
		to => 'http://www.astrobin.com/api/v1/image/$1/?api_key={{ENV{DDG_SPICE_ASTROBIN_APIKEY}}}&api_secret={{ENV{DDG_SPICE_ASTROBIN_APISECRET}}}&format=json',
		wrap_jsonp_callback => 1
	}
};

handle remainder => sub {
        return '' if /^((image|photo|picture)s?)?\s*(of|of the)?\s*(day|today|daily)$/i;
        return '' if $req->query_lc eq 'apod';
        return;
};
1;
