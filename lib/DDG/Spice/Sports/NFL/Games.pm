package DDG::Spice::Sports::NFL::Games;
# ABSTRACT: NFL Boxscores

use strict;
use DDG::Spice;

primary_example_queries "nfl games";
secondary_example_queries "patriots score";
description "NFL games search.";
name "NFL Games";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Sports/NFL/Games.pm";
topics "everyday", "entertainment";
category "entertainment";
attribution github => ["https://github.com/duckduckgo/", "DuckDuckGo"],
            twitter => ["https://twitter.com/duckduckgo", "DuckDuckGo"];

spice to => 'https://duckduckgo.com/sports.js?q=$1&callback={{callback}}';

triggers start => '///***never trigger***///';

handle remainder => sub {
    return $_;
#    return $_ if $_ && !exists $skip{lc $_};
    return;
};

1;
