package DDG::Spice::Pokemon::Data;
# ABSTRACT: Returns pokemon data from the pokeapi API

use DDG::Spice;
use Text::Trim;

spice is_cached => 1;
spice proxy_cache_valid => "200 30d";

# Triggers
triggers startend => "pokemon", "pokedex";
triggers end => "evolution";

spice to => 'http://pokeapi.co/api/v1/pokemon/$1/';
spice wrap_jsonp_callback => 1;

spice alt_to => {
	description => {
		is_cached => 1,
		proxy_cache_valid => '200 30d',
		to => 'http://pokeapi.co/api/v1/description/$1/'
	}
};

my %pokemon = map { trim($_) => 0 } share('pokemon-names.txt')->slurp;

# Handle statement
handle remainder_lc => sub {
    return unless $_;
    return unless exists $pokemon{$_};
    return $_;
};

1;
