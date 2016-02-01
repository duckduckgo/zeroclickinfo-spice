package DDG::Spice::FlashVersion;
# ABSTRACT: Shows installed flash version

use strict;
use DDG::Spice;

triggers startend => "flash";

spice call_type => 'self';

handle query_lc => sub {
    return $_ eq 'flash version' ? call : ();
};

1;
