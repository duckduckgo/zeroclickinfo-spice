package DDG::Spice::Dictionary::Pronunciation;
# ABSTRACT: Get pronounciation information of a word

use strict;
use DDG::Spice;

attribution web => ['http://duckduckgo.com', 'DuckDuckGo'],
            twitter => ['http://twitter.com/duckduckgo', 'DuckDuckGo'];

spice to => 'http://api.wordnik.com/v4/word.json/$1/pronunciations?limit=1&useCanonical=false&api_key={{ENV{DDG_SPICE_WORDNIK_APIKEY}}}&callback={{callback}}';
triggers any => "///***never_trigger***///";

handle remainder => sub {
    return $_ if $_;
    return;
};

1;
