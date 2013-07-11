package DDG::Spice::Video;

use DDG::Spice;

spice to => 'https://jagtalon.duckduckgo.com/video.js?q=$1&n=12&callback={{callback}}';
triggers startend => "video";
spice is_cached => 0;

handle remainder => sub {
    return $_ if $_;
    return;
};

1;