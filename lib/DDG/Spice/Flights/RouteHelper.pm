package DDG::Spice::Flights::RouteHelper;
# ABSTRACT: Helper spice for loading  routes from JS in the Flights spice

use strict;
use DDG::Spice;

attribution github => ["https://github.com/tommytommytommy", 'tommytommytommy'];

# cache responses for 5 minutes
spice proxy_cache_valid => "200 304 5m";

spice to => 'https://api.flightstats.com/flex/flightstatus/rest/v2/jsonp/route/status/$1/$2/$3/$4/$5/$6/?hourOfDay=$7&utc=true&appId={{ENV{DDG_SPICE_FLIGHTS_API_ID}}}&appKey={{ENV{DDG_SPICE_FLIGHTS_APIKEY}}}&callback={{callback}}';

triggers any => "///***never_trigger***///";

spice from => '(.*)/(.*)/(.*)/(.*)/(.*)/(.*)/(.*)';

handle remainder => sub {
    return $_ if $_;
    return;
};

1;
