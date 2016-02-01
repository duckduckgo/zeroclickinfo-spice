package DDG::Spice::Sports::MLB::Games;
# ABSTRACT: MLB Boxscores

use strict;
use DDG::Spice;

spice to => 'https://duckduckgo.com/sports.js?q=$1&callback={{callback}}';

triggers start => '///***never trigger***///';

handle remainder => sub {
    return $_;
#    return $_ if $_ && !exists $skip{lc $_};
    return;
};

1;
