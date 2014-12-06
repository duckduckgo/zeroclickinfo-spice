package DDG::Spice::IndianRailPnrStatus;
# ABSTRACT: Returns the current booking status for a valid PNR number under Indian Railways

use DDG::Spice;

primary_example_queries "pnr 0123456789";
description "Shows the current booking status for a valid PNR number under Indian Railways";
category "special";
topics "travel";
attribution github => ['https://github.com/jee1mr','Jeevan M R'],
            twitter => ['https://twitter.com/jee1mr','Jeevan M R'];

triggers start => 'pnr';
spice to => 'http://api.erail.in/pnr?key=e9d415f5-1029-4bac-b6e2-b3561b1f4214&pnr=$1';
spice wrap_jsonp_callback => 1;
spice is_cached => 1;

handle remainder => sub {
    return $_ if($_ =~ /^\d{10}$/)                 # Checks if it's a 10 digit number
    return;
};

1;
