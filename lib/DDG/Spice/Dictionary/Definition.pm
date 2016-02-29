package DDG::Spice::Dictionary::Definition;
# ABSTRACT: Get definition of a word

use strict;
use DDG::Spice;

spice to => 'http://api.wordnik.com/v4/word.json/$1/definitions?includeRelated=true&includeTags=true&limit=3&api_key={{ENV{DDG_SPICE_WORDNIK_APIKEY}}}&callback={{callback}}';
spice proxy_cache_valid => '200 30d';

spice alt_to => {
	audio => {
		to => 'http://api.wordnik.com/v4/word.json/$1/audio?limit=10&useCanonical=false&api_key={{ENV{DDG_SPICE_WORDNIK_APIKEY}}}&callback={{callback}}',
		proxy_cache_valid => '418 1d'
	},
	hyphenation => {
		to => 'http://api.wordnik.com/v4/word.json/$1/hyphenation?includeRelated=true&api_key={{ENV{DDG_SPICE_WORDNIK_APIKEY}}}&callback={{callback}}'
	},
	pronunciation => {
		to => 'http://api.wordnik.com/v4/word.json/$1/pronunciations?limit=1&useCanonical=false&api_key={{ENV{DDG_SPICE_WORDNIK_APIKEY}}}&callback={{callback}}'
	},
	reference => {
		to => 'http://api.wordnik.com/v4/word.json/$1/definitions?includeRelated=true&includeTags=true&limit=3&api_key={{ENV{DDG_SPICE_WORDNIK_APIKEY}}}&callback={{callback}}',
		proxy_cache_valid => '200 30d'
	}
};

triggers startend => (
    "define",
    "define:",
    "definition",
    "definition:",
    "definition of",
    "definition of:",
    "meaning",
    "meaning of",
    "meaning of:",
);


handle remainder => sub {
    return lc($_) if $_;
    return;
};

1;
