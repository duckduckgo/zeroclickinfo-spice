package DDG::Spice::Video;

use DDG::Spice;

primary_example_queries "ted education video";
secondary_example_queries "wong fu videos", "coffee videos";
description "Shows videos from around the web.";
name "Video";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Video.pm";
topics "everyday", "entertainment";
category "entertainment";
attribution github => ["https://github.com/duckduckgo/", "DuckDuckGo"],
            twitter => ["https://twitter.com/duckduckgo", "duckduckgo"];


spice to => 'https://duckduckgo.com/v.js?q=$1&n=20&callback={{callback}}';
triggers startend => 'video', 'videos', 'youtube';

handle remainder => sub {
    return $_ if $_;
    return;
};

1;
