package DDG::Spice::Dictionary::DictionaryAudio;

use DDG::Spice;

spice to => 'https://api.wordnik.com/v4/word.json/$1/audio?limit=1&useCanonical=false&api_key={{ENV{DDG_SPICE_RANDWORD_APIKEY}}}&callback={{callback}}';
triggers any => "///***never_trigger***///";
spice is_cached => 0;
spice proxy_cache_valid => "418 1d";

handle remainder => sub {
    return $_ if $_;
    return;
};

1;