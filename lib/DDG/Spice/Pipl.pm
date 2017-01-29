package DDG::Spice::Pipl;

use DDG::Spice;

triggers query => qr/^(\w+\s\w+\s?\w*)|([\d\s\-\+\.()]{6,20})|([a-zA-Z0-9._%\-+]+@[a-zA-Z0-9._%\-]+\.[a-zA-Z]{2,6})$/;

spice to => 'http://75.126.80.72/partnerapi/?q=$1&key={{ENV{DDG_SPICE_PIPL_APIKEY}}}&callback={{callback}}';

handle matches => sub {
    return @_;
    return;
};

1;
