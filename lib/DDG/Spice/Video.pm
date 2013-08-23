package DDG::Spice::Video;

use DDG::Spice;

spice to => 'https://jagtalon.duckduckgo.com/video.js?q=$1&n=20&callback={{callback}}';
triggers startend => "video", "videos";
spice is_cached => 0;

handle remainder => sub {
    return $_ if $_;
    return;
};

1;
