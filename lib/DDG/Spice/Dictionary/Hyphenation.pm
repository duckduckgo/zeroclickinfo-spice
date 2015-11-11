package DDG::Spice::Dictionary::Hyphenation;
# ABSTRACT: Get hyphenation of a word

use strict;
use DDG::Spice;

spice to => 'http://api.wordnik.com/v4/word.json/$1/hyphenation?includeRelated=true&api_key={{ENV{DDG_SPICE_WORDNIK_APIKEY}}}&callback={{callback}}';
triggers startend => "///***never trigger***///";

handle query_lc => sub {
    return $_ if $_;
    return;
};

1;
