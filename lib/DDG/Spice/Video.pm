package DDG::Spice::Video;

use DDG::Spice;

spice to => 'https://jagtalon.duckduckgo.com/video.js?search=$1&callback={{callback}}';
triggers startend => "video";

handle remainder => sub {
    return $_ if $_;
    return;
};

1;