package DDG::Spice::Beer;

use strict;
use DDG::Spice;

primary_example_queries "beer leffe triple";
description "Shows basic information about the beer.";
name "Beers";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Beer.pm";
category "reference";
topics "entertainment", "everyday";
attribution github => ["https://github.com/azac", "azac"],
            twitter => "adr_zan";
 

spice to => 'http://api.openbeerdatabase.com/v1/beers.json?query=$1';

triggers startend => "beer", "piwo";

spice wrap_jsonp_callback => 1;
spice is_cached => 1;

handle remainder => sub {
    return $_ if $_;
    return;
};

1;

