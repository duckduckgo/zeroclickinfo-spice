package DDG::Spice::Pokedex;

# ABSTRACT: Returns Pokedex entry from PokeAPI.

use DDG::Spice;

triggers startend => 'pokedex', 'pokedéx', 'pokemon', 'pokémon';

spice to => 'http://pokeapi.co/api/v1/pokemon/$1/';

attribution web => ['http://alex-acevedo.info', 'Alex Acevedo']
			github => ['http://github.com/nes630', 'nes630']
			twitter => "hackallofit"
			email => ['hackallofit@outlook.com', 'hackallofit']
			facebook => ['http://www.facebook.com/alex.acevedo.1232', 'Alex Acevedo']


spice wrap_jsonp_callback => 1;

handle remainder => sub {
	return $_ if $_;
	return;
};

1;
