package DDG::Spice::Dictionary::Definition;

use DDG::Spice;

description "Get the definition of a word";
name "Dictionary";
primary_example_queries "define inundate";
secondary_example_queries "definition of dictionary";
topics "everyday";
category "reference";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Dictionary/Definition.pm";
attribution web => ['http://duckduckgo.com', 'DuckDuckGo'],
            twitter => ['http://twitter.com/duckduckgo', '@duckduckgo'];

spice to => 'http://api.wordnik.com/v4/word.json/$1/definitions?includeRelated=true&useCanonical=true&includeTags=true&limit=3&api_key={{ENV{DDG_SPICE_WORDNIK_APIKEY}}}&callback={{callback}}';

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
    return lc $_;
};

1;
