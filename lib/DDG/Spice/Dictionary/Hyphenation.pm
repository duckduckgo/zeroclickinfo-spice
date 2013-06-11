package DDG::Spice::Dictionary::Hyphenation;

use DDG::Spice;

attribution web => ['http://duckduckgo.com', 'DuckDuckGo'],
            twitter => ['http://twitter.com/duckduckgo', '@duckduckgo'];

spice to => 'https://api.wordnik.com/v4/word.json/$1/hyphenation?includeRelated=true&api_key={{ENV{DDG_SPICE_WORDNIK_APIKEY}}}&callback={{callback}}';
triggers startend => "///***never trigger***///";
spice is_cached => 1;

handle query_lc => sub {
    return $_ if $_;
    return;
};

1;