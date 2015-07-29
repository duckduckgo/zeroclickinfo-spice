package DDG::Spice::ZomatoResult;
# ABSTRACT: 

use strict;
use DDG::Spice;

spice to => 'http://dheerajavvari.zdev.net/duckduckgo_api.php?loc=$1';

triggers startend => "//***never trigger***//";

handle remainder => sub {
    return if $_ eq '';
    return $_ if $_;
    return;
};

1;