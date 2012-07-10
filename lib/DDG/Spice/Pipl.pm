package DDG::Spice::Pipl;

use DDG::Spice;

triggers query => qr/^([A-Za-z]+\s[A-Za-z]+)$/;

spice to => 'http://v2.pipl.com/test.json?$1';
spice wrap_jsonp_callback => 1;

handle matches => sub {
    return @_;
    return;
};

1;
