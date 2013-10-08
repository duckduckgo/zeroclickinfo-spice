package DDG::Spice::Dictionary::Reference;

use DDG::Spice;

attribution web => ['http://duckduckgo.com', 'DuckDuckGo'],
            twitter => ['http://twitter.com/duckduckgo', '@duckduckgo'];

spice to => 'https://api.wordnik.com/v4/word.json/$1/definitions?includeRelated=true&includeTags=true&limit=3&api_key={{ENV{DDG_SPICE_WORDNIK_APIKEY}}}&callback={{callback}}';
triggers startend => "///***never trigger***///";

handle query_lc => sub {
    return $_ if $_;
    return;
};

1;
