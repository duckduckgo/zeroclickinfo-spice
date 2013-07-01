package DDG::Spice::Video;

use DDG::Spice;

spice to => 'https://www.googleapis.com/youtube/v3/search?part=snippet&order=relevance&q=$1&type=video&videoType=any&key=AIzaSyCcg33a9CZJ8APUnbPW7tVdQPVgX5tty1o&callback={{callback}}';
triggers startend => "video";

handle remainder => sub {
    return $_ if $_;
    return;
};

1;