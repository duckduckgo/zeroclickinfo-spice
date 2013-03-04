package DDG::Spice::Dictionary;

use DDG::Spice;

spice to => 'https://api.wordnik.com/v4/word.json/$1/definitions?includeRelated=true&useCanonical=false&includeTags=false&limit=3&api_key=6537cf21cba70166d520606db78030d8503fd1dbc3cf3bf40&callback={{callback}}';
triggers any => "define";
spice is_cached => 0;
spice proxy_cache_valid => "418 1d";

handle remainder => sub {
    return $_ if $_;
    return;
};

1;