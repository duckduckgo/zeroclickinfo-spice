package DDG::Spice::Videos;

use DDG::Spice;

primary_example_queries "ted education video", "wong fu videos", "coffee videos";
description "Shows videos from around the web.";
name "Video";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Video.pm";
topics "everyday", "entertainment";
category "entertainment";
attribution github => ["https://github.com/duckduckgo/", "DuckDuckGo"],
            twitter => ["https://twitter.com/duckduckgo", "duckduckgo"];


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
