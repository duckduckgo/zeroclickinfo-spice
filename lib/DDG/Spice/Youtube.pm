package DDG::Spice::Youtube;

use DDG::Spice;

spice to => 'http://gdata.youtube.com/feeds/videos?max-results=5&start-index=1&alt=json-in-script&callback={{callback}}&vq=$1';
triggers startend => "video", "videos";

handle remainder => sub {
    return $_ if $_;
    return;
};

1;