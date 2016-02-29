package DDG::Spice::Videos;
# ABSTRACT: Video search

use strict;
use DDG::Spice;

spice to => 'https://duckduckgo.com/v.js?q=$1&n=20&callback={{callback}}';

# 2014.05.07 (caine): moving to startend until
# we are invariably required to do entity extraction
# 'batman video games' shouldn't trigger this module
#triggers startend =>
#    'video',
#    'videos',
#    'youtube',
#    'vimeo',
#    ;

my %skip = map { $_ => 0 } (
    'calendar',
    'authy remove account',
    'www',
    'yt',
    '18+'
);

# 2014.05.19 (ct): deep spice.
triggers start => '///***never trigger***///';

handle remainder => sub {
    return $_ if $_ && !exists $skip{lc $_};
    return;
};

1;
