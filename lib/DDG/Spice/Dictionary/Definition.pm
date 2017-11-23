package DDG::Spice::Dictionary::Definition;
# ABSTRACT: Get definition of a word

use strict;
use DDG::Spice;

spice to => 'http://api.wordnik.com/v4/word.json/$1/definitions?includeRelated=true&includeTags=true&limit=3&api_key={{ENV{DDG_SPICE_WORDNIK_APIKEY}}}&callback={{callback}}&useCanonical=true';
spice proxy_cache_valid => '200 30d';
spice content_type_javascript => 1;

spice alt_to => {
	audio => {
		to => 'http://api.wordnik.com/v4/word.json/$1/audio?limit=10&useCanonical=true&api_key={{ENV{DDG_SPICE_WORDNIK_APIKEY}}}&callback={{callback}}',
		proxy_cache_valid => '418 1d',
		content_type_javascript => 1,
	},
	hyphenation => {
		to => 'http://api.wordnik.com/v4/word.json/$1/hyphenation?includeRelated=true&api_key={{ENV{DDG_SPICE_WORDNIK_APIKEY}}}&callback={{callback}}&useCanonical=true',
		content_type_javascript => 1,
	},
	pronunciation => {
		to => 'http://api.wordnik.com/v4/word.json/$1/pronunciations?limit=1&useCanonical=true&api_key={{ENV{DDG_SPICE_WORDNIK_APIKEY}}}&callback={{callback}}',
		content_type_javascript => 1,
	},
	reference => {
		to => 'http://api.wordnik.com/v4/word.json/$1/definitions?includeRelated=true&includeTags=true&limit=3&api_key={{ENV{DDG_SPICE_WORDNIK_APIKEY}}}&callback={{callback}}&useCanonical=true',
		proxy_cache_valid => '200 30d',
		content_type_javascript => 1
	}
};

spice upstream_timeouts => +{ connect => '200ms',
                              send => '200ms',
                              read => '500ms' };

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
    if ($_) {
        # Remove quotes from the string since Wordnik does not have
        # any words that start or end with quotes.
        $_ =~ tr/"//d;

        # Make sure to transform the string to lowercase as well.
        return lc($_);
    }

    return;
};

1;
