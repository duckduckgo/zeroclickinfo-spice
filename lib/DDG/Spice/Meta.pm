package DDG::Spice::Meta;
# ABSTRACT: Search for recipes on yummly.com

use strict;
use DDG::Spice;


triggers startend => 'perl';

#spice to => 

handle remainder => sub {
    return lc($_) if $_;
    return;
};

1;
