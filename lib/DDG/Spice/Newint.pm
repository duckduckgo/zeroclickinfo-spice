package DDG::Spice::Newint;
# ABSTRACT: Returns a list of New Internationalist magazines.

use DDG::Spice;

name "newint";
description "List all New Internationalist magazines or search for a particular issue.";
primary_example_queries "newint";
secondary_example_queries "newint gold";
category "reference";
topics "everyday", "entertainment";
attribution github => ["https://github.com/sighmon", "Simon Loffler"],
            twitter => ["https://twitter.com/sighmon", "sighmon"];

triggers startend => "newint", "new internationalist magazine", "new internationalist";

spice to => 'https://digital.newint.com.au/issues.json?utf8=✓&query=$1';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
    return lc $_;
};

1;
