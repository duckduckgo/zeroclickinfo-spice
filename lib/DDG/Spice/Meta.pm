package DDG::Spice::Meta;
# ABSTRACT: Meta IA (test)

use strict;
use DDG::Spice;


triggers startend => 'perl';

spice to => 'https://maria.duckduckgo.com/?q=$1&cb={{callback}}'; 

handle remainder => sub {
    return lc($_) if $_;
    return;
};

1;
