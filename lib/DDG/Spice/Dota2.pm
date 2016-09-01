package DDG::Spice::Dota2;
# ABSTRACT: Returns information about Dota 2 heroes and items.

use DDG::Spice;

name "Dota 2 Hero and Item Search";
source "Dota2";
description "Search for heroes and items.";
primary_example_queries "dota2 blink","dota 2 pudge","crystal maiden dota2","clarity dota 2","dota2 invoker", "dota2 magic wand";
category "reference";
topics "special_interest", "geek", "gaming";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Dota2.pm";
attribution github => ["https://github.com/echosa", "Echosa"],
            twitter => "echosa";

triggers startend => 'dota2', 'dota 2';

spice to => 'https://www.dota2.com/jsfeed/heropediadata?feeds=itemdata,herodata,abilitydata&l=english';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
    return $_ if $_;
    return;
};

1;
