package DDG::Spice::Series;

use DDG::Spice;

triggers any => "tv series", "serie", "show", "tv show";

spice to => 'http://series-ortiz.rhcloud.com/series?name=$1&callback={{callback}}&s=thetvdb';

handle remainder => sub {
    return $_ if $_;
    return;
};

1;