package DDG::Spice::Sports::MLB::Games;
# ABSTRACT: MLB Boxscores

use strict;
use DDG::Spice;

primary_example_queries "blue jays scores";
secondary_example_queries "red sox yankees";
description "MLB games boxscores search.";
name "MLB Games";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Sports/MLB/Games.pm";
topics "everyday", "entertainment";
category "entertainment";
attribution github => ["https://github.com/duckduckgo/", "DuckDuckGo"],
            twitter => ["https://twitter.com/duckduckgo", "DuckDuckGo"];

spice to => 'https://duckduckgo.com';

triggers start => '///***never trigger***///';

handle remainder => sub {
    return $_;
#    return $_ if $_ && !exists $skip{lc $_};
    return;
};

1;
