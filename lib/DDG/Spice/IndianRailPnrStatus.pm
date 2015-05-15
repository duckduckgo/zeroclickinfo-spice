package DDG::Spice::IndianRailPnrStatus;
# ABSTRACT: Returns the current booking status for a valid PNR number under Indian Railways

use DDG::Spice;

primary_example_queries "pnr 0123456789";
description "Shows the current booking status for a valid PNR number under Indian Railways";
category "special";
topics "travel";
attribution github => ['https://github.com/jee1mr','Jeevan M R'],
            twitter => ['https://twitter.com/jee1mr','Jeevan M R'];

triggers startend => 'pnr', 'pnr status', 'pnr number', 'pnr lookup';
#spice to => 'http://api.erail.in/pnr?key={{ENV{DDG_SPICE_PNR_STATUS_APIKEY}}}&pnr=$1';
spice to => 'http://www.json-generator.com/api/json/get/cisscdleeW?indent=2';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
    return $_ if $_ && $_ =~ /^\d{10}$/;                 # Checks if it's a 10 digit number
    return;
};

1;
