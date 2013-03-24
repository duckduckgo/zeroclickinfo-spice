package DDG::Spice::Dictionary::DictionaryFallback;

use DDG::Spice;

spice to => 'https://api.wordnik.com/v4/word.json/$1/definitions?includeRelated=true&useCanonical=true&includeTags=false&limit=3&api_key={{ENV{DDG_SPICE_RANDWORD_APIKEY}}}&callback={{callback}}';
triggers any => "///***never_trigger***///";
spice is_cached => 1;

handle remainder => sub {
    return $_ if $_;
    return;
};

1;