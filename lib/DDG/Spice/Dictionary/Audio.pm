package DDG::Spice::Dictionary::Audio;
# ABSTRACT: Get audio file for pronounciation of a word

use strict;
use DDG::Spice;

attribution web => ['http://duckduckgo.com', 'DuckDuckGo'],
            twitter => ['http://twitter.com/duckduckgo', 'DuckDuckGo'];

spice to => 'http://api.wordnik.com/v4/word.json/$1/audio?limit=10&useCanonical=false&api_key={{ENV{DDG_SPICE_WORDNIK_APIKEY}}}&callback={{callback}}';
triggers any => "///***never_trigger***///";
spice proxy_cache_valid => "418 1d";

handle remainder => sub {
    return $_ if $_;
    return;
};

1;
