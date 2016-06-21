package DDG::Spice::Meta;
# ABSTRACT: Meta IA (test)

use strict;
use DDG::Spice;


triggers startend => 'perl';

spice to => 'http://api.duckduckgo.com/?q=DuckDuckGo&format=json'; 

wrap_jsonp => 1;

handle remainder => sub {
    return lc($_) if $_;
    return;
};

1;
