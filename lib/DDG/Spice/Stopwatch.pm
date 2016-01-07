package DDG::Spice::Stopwatch;
# ABSTRACT: Shows a stopwatch

use strict;
use DDG::Spice;

triggers startend => ['stopwatch', 'stop watch'];

#in real code this should just be spice call_type => 'self'
#for now, it lets me test on DuckPAN
spice call_type => 'self';

handle remainder => sub {
    return '' if ($_ eq '' || $_ eq 'online');
    return;
};

1;
