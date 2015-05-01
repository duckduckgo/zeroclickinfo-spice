package DDG::Spice::Dictionary::Reference;
# ABSTRACT: Used to get the definition of the singular form for plural queries

use strict;
use DDG::Spice;

attribution web => ['http://duckduckgo.com', 'DuckDuckGo'],
            twitter => ['http://twitter.com/duckduckgo', 'DuckDuckGo'];

spice to => 'http://api.wordnik.com/v4/word.json/$1/definitions?includeRelated=true&includeTags=true&limit=3&api_key={{ENV{DDG_SPICE_WORDNIK_APIKEY}}}&callback={{callback}}';
spice proxy_cache_valid => '200 30d';

triggers startend => "///***never trigger***///";

handle query_lc => sub {
    return $_ if $_;
    return;
};

1;
