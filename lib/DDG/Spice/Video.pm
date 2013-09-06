package DDG::Spice::Video;

use DDG::Spice;

spice to => 'https://duckduckgo.com/v.js?q=$1&n=20&callback={{callback}}';

triggers startend => 'video', 'videos', 'vimeo', 'youtube', 'metacafe', 'dailymotion';

spice is_cached => 0;

handle remainder => sub {
    return $_ if $_;
    return;
};

1;
