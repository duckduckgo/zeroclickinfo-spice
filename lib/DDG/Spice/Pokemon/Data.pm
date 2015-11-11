package DDG::Spice::Pokemon::Data;
# ABSTRACT: Returns pokemon data from the pokeapi API

use DDG::Spice;

spice is_cached => 1;
spice proxy_cache_valid => "200 30d";

# Triggers
triggers startend => "pokemon", "pokedex";
triggers end => "evolution";

spice to => 'http://pokeapi.co/api/v1/pokemon/$1/';
spice wrap_jsonp_callback => 1;

# Handle statement
handle remainder => sub {
    return lc $_ unless !$_ or $_ =~ /\s/;
    return;
};

1;
