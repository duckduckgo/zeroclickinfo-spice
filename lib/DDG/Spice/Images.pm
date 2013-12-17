package DDG::Spice::Images;

use DDG::Spice;

spice to => 'https://duckduckgo.com/i.js?q=$1&o=json&cb={{callback}}';

triggers any =>
    'image',
    'images',
    'pic',
    'pics',
    'photo',
    'photos',
    'photographs',
    ;

triggers startend =>
    'photograph',
    'meme',
    'memes',
    'book cover',
    'book covers',
    'gif',
    'jpg',
    'png',
    'logo',
    ;

handle remainder => sub {
    return $_ if $_;
    return;
};

1;
