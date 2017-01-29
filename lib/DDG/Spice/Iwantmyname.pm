package DDG::Spice::Iwantmyname;

use DDG::Spice;

spice to => 'http://iwantmyname.com/tld_info/$1?callback={{callback}}';

triggers query_lc => qr/^([^\s]+) domain$/;

handle matches => sub {
    my ($tld) = @_;
    return $tld if $tld;
    return;
};

1;
