package DDG::Spice::Pokemon::Data;
# ABSTRACT: Returns pokemon data from the pokeapi API

use DDG::Spice;

spice is_cached => 1;

name "Pokemon";
source "Pokéapi";
icon_url "/i/www.pokeapi.co.ico";
description "Fetches details of a given Pokemon";
primary_example_queries "pokemon pikachu", "bulbasaur pokemon";
category "entertainment";
topics "entertainment", "geek";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Pokemon.pm";
attribution github => ["AkA84"];

# Triggers
triggers startend => "pokemon";

spice to => 'http://pokeapi.co/api/v1/pokemon/$1';
spice wrap_jsonp_callback => 1;

# Handle statement
handle remainder => sub {
    return lc $_ if $_;
    return;
};

1;
