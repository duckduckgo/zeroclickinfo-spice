package DDG::Spice::Pokemon::Description;
# ABSTRACT: Returns pokemon description from the pokeapi API

use DDG::Spice;

spice is_cached => 1;
spice proxy_cache_valid => "200 30d";

attribution github => ["AkA84"];

triggers any => "///***never_trigger***///";

spice to => 'http://pokeapi.co/api/v1/description/$1/';

handle remainder => sub {
    return $_ if $_;
    return;
};

1;