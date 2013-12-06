package DDG::Spice::Images;

use DDG::Spice;

spice to => 'https://127.0.0.1/i.js?q=$1&o=json&cb={{callback}}';
triggers any => 'image', 'images';

handle remainder => sub {
    return $_ if $_;
    return;
};

1;
