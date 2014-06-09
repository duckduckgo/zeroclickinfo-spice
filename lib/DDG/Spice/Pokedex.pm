package DDG::Spice::Pokedex;

# ABSTRACT: Returns Pokedex entry from PokeAPI.

use DDG::Spice;

triggers startend => 'pokedex', 'pokedéx', 'pokemon', 'pokémon';

spice to => 'http://pokeapi.co/api/v1/pokemon/$1/';

spice wrap_jsonp_callback => 1;

handle remainder => sub {
	return $_ if $_;
	return;
};

1;
