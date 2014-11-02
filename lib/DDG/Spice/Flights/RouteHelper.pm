package DDG::Spice::Flights::RouteHelper;

use DDG::Spice;

attribution github => ["https://github.com/tommytommytommy", 'tommytommytommy'];

spice to => 'http://api.flightstats.com/flex/flightstatus/rest/v2/jsonp/route/status/$1&utc=true&appId={{ENV{DDG_SPICE_FLIGHTS_API_ID}}}&appKey={{ENV{DDG_SPICE_FLIGHTS_API_KEY}}}&callback={{callback}}';

triggers any => "///***never_trigger***///";

handle remainder => sub {
    return $_ if $_;
    return;
};

1;
