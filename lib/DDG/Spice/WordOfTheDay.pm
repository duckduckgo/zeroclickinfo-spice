package DDG::Spice::WordOfTheDay;

# ABSTRACT: Show the word of the day, provided by the Wornik API

use DDG::Spice;

spice is_cached => 1;
spice proxy_cache_valid => "200 1d";

spice wrap_jsonp_callback => 1;

# for testing, run: DDG_SPICE_WORDNIK_APIKEY=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5 duckpan server
spice to => 'http://api.wordnik.com/v4/words.json/wordOfTheDay?api_key={{ENV{DDG_SPICE_WORDNIK_APIKEY}}}';

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

triggers start =>
    'word of the day',
    'dictionary word of the day',
    'word of the day dictionary',
    'what is the word of the day';

handle remainder => sub {
    
    return unless $_ eq '';
    
    return $_;
};

1;
