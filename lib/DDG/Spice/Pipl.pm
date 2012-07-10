package DDG::Spice::Pipl;

use DDG::Spice;

triggers query => qr/^([A-Za-z]+\s[A-Za-z]+)$/;

spice to => 'http://ec2-23-22-204-83.compute-1.amazonaws.com/test.json?$1';
spice wrap_jsonp_callback => 1;

handle matches => sub {
    return @_;
    return;
};

1;
