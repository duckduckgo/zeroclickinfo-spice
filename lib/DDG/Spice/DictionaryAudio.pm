package DDG::Spice::DictionaryAudio;

use DDG::Spice;

spice to => 'https://api.wordnik.com/v4/word.json/$1/audio?limit=1&useCanonical=false&api_key=6537cf21cba70166d520606db78030d8503fd1dbc3cf3bf40&callback={{callback}}';
triggers any => "///***never_trigger***///";
spice is_cached => 0;
spice proxy_cache_valid => "418 1d";

handle remainder => sub {
    return $_ if $_;
    return;
};

1;