package DDG::Spice::OpenSNP;

use DDG::Spice;

spice to => 'http://opensnp.org/snps/json/annotation/$1.json';

triggers query_lc  => qr/(^rs[^\s]+)$/;

handle matches => sub {
    return @_ if @_;
    return;
};

1;
