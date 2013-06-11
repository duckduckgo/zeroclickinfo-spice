package DDG::Spice::Youtube;

use DDG::Spice;

description "Search for YouTube videos";
name "YouTube";
primary_example_queries "charlie bit my finger video", "youtube double rainbow";
topics "entertainment", "everyday";
category "entertainment";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Youtube.pm";
attribution web => ['http://duckduckgo.com', 'DuckDuckGo'],
            twitter => ['http://twitter.com/duckduckgo', 'duckduckgo'];

spice to => 'http://gdata.youtube.com/feeds/videos?max-results=5&start-index=1&alt=json-in-script&callback={{callback}}&vq=$1';
triggers startend => "youtube", "video", "videos";

handle remainder => sub {
    return $_ if $_;
    return;
};

1;