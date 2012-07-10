package DDG::Spice::Pipl;

use DDG::Spice;

#triggers query => qr/^([A-Za-z]+\s[A-Za-z]+)$/;

triggers query => qr/^(.+)$/;

spice to => 'http://75.126.80.72/duckduckapi/?q=$1&callback={{callback}}';
spice wrap_jsonp_callback => 1;

handle matches => sub {
    return @_;
    return;
};

1;
