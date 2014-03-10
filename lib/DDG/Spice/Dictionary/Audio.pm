package DDG::Spice::Dictionary::Audio;

use DDG::Spice;

attribution web => ['http://duckduckgo.com', 'DuckDuckGo'],
            twitter => ['http://twitter.com/duckduckgo', '@duckduckgo'];

spice to => 'http://api.wordnik.com/v4/word.json/$1/audio?limit=10&useCanonical=false&api_key={{ENV{DDG_SPICE_WORDNIK_APIKEY}}}';

spice proxy_cache_valid => "418 1d";

1;
