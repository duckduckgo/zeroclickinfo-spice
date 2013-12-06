package DDG::Spice::Video;

use DDG::Spice;

primary_example_queries "ted education video", "wong fu videos", "coffee videos";
description "Shows videos from around the web.";
name "Video";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Video.pm";
topics "everyday", "entertainment";
category "entertainment";
attribution github => ["https://github.com/duckduckgo/", "DuckDuckGo"],
            twitter => ["https://twitter.com/duckduckgo", "duckduckgo"];


spice to => 'https://127.0.0.1/v.js?q=$1&n=20&callback={{callback}}';
triggers any => 'video', 'videos', 'youtube', 'vimeo';

handle remainder => sub {
    return $_ if $_;
    return;
};

1;
