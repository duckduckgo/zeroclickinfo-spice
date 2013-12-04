package DDG::Spice::Images;

use DDG::Spice;

spice to => 'https://duckduckgo.com/i.js?q=$1&cb=DDG.duckbar.images.display';
triggers any => 'image', 'images';

handle remainder => sub {
    return $_ if $_;
    return;
};

1;
