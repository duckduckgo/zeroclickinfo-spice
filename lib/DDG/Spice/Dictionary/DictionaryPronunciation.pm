package DDG::Spice::Dictionary::DictionaryPronunciation;

use DDG::Spice;

spice to => 'http://api.wordnik.com/v4/word.json/$1/pronunciations?limit=1&useCanonical=false&api_key={{ENV{DDG_SPICE_RANDWORD_APIKEY}}}&callback={{callback}}';
triggers any => "///***never_trigger***///";
spice is_cached => 1;

handle remainder => sub {
    return $_ if $_;
    return;
};

1;