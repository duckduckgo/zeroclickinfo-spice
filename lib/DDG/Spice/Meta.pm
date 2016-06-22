package DDG::Spice::Meta;
# ABSTRACT: Meta IA (test)

use strict;
use DDG::Spice;


triggers startend => 'perl';

spice call_type => 'self'; 

handle query_lc => sub {
    return call;
};

1;
