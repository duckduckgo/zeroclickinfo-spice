package DDG::Spice::Dictionary::Reference;

use DDG::Spice;

spice to => 'https://api.wordnik.com/v4/word.json/$1/definitions?includeRelated=true&useCanonical=true&includeTags=true&limit=3&api_key={{ENV{DDG_SPICE_RANDWORD_APIKEY}}}';
triggers startend => "///***never trigger***///";
spice is_cached => 1;

handle query_lc => sub {
    return $_ if $_;
    return;
};

1;