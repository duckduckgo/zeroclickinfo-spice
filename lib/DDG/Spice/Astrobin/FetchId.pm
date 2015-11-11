package DDG::Spice::Astrobin::FetchId;
# ABSTRACT: Fetch the Astrophoto data

use strict;
use DDG::Spice;

spice to => 'http://www.astrobin.com/api/v1/image/$1/?api_key={{ENV{DDG_SPICE_ASTROBIN_APIKEY}}}&api_secret={{ENV{DDG_SPICE_ASTROBIN_APISECRET}}}&format=json';

triggers any => "///***never trigger***///";

spice wrap_jsonp_callback => 1;

handle remainder => sub {
        return;
};

1;
