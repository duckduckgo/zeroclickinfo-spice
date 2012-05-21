package DDG::Spice::RandWord;

use DDG::Spice;

spice is_cached => 0;

spice from => '(?:([0-9]+)\-([0-9]+)|)';
spice to => 'http://api.wordnik.com/v4/words.json/randomWord?minLength=$1&maxLength=$2&api_key={{ENV{DDG_SPICE_RANDWORD_APIKEY}}}&callback={{callback}}';
spice proxy_cache_valid => "418 1d";

triggers any => "random", "word";

handle query_lc => sub {
    if ($_ =~ /^random word(?: ([0-9]+\-[0-9]+)|)$/) {
    	if ($1) {
    	    return $1;
    	} else {
    	    return '';
    	}
    }
    return;
};

1;
