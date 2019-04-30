package DDG::Spice::Rhymes;
# ABSTRACT: Searches for rhyming words

use strict;
use DDG::Spice;

triggers any => "rhyme", "rhymes";

spice to => 'https://rhymebrain.com/talk?function=getRhymes&word=$1&jsonp={{callback}}';

spice proxy_cache_valid => "418 1d";

handle remainder_lc => sub {
    /^
    (?:(?:what|words|that?)\s+){0,2}
    (?:(?:with|for)\s+)?
    ([a-zA-Z]+)
    (?:\s+with)?\??
    $/x;
    return $1 if defined $1;
    return;
};

1;
