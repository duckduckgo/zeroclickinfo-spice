package DDG::Spice::Dictionary::Dictionary;

use DDG::Spice;

spice to => 'https://api.wordnik.com/v4/word.json/$1/definitions?includeRelated=true&useCanonical=false&includeTags=false&limit=3&api_key={{ENV{DDG_SPICE_RANDWORD_APIKEY}}}&callback={{callback}}';
triggers any => "define", "define:";
spice is_cached => 1;

handle remainder => sub {
    return $_ if $_;
    return;
};

1;