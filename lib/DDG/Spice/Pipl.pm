package DDG::Spice::Pipl;

use DDG::Spice;

#triggers query => qr/^([A-Za-z]+\s[A-Za-z]+)$/;

triggers query => qr/^(\w+\s\w+\s?\w*)|([\d\s\-\+\.()]{6,20})|([a-zA-Z0-9._%\-+]+@[a-zA-Z0-9._%\-]+\.[a-zA-Z]{2,6})$/;

spice to => 'http://75.126.80.72/duckduckapi/?q=$1&callback={{callback}}';

handle matches => sub {
    return @_;
    return;
};

1;
