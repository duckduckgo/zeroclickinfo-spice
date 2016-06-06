package DDG::Spice::News;
# ABSTRACT: Show current news from different sources.

use strict;
use DDG::Spice;

triggers start => '///***never trigger***///';

spice to => 'https://duckduckgo.com/news.js?q=$1&cb={{callback}}';


handle query_lc => sub {
    return $_ if $_;
    return;
};

1;
