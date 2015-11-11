package DDG::Spice::OpenSNP;
# ABSTRACT: Search for annotations to genotypes

use strict;
use DDG::Spice;

spice to => 'https://opensnp.org/snps/json/annotation/$1.json';
spice proxy_cache_valid  => "5m";
spice wrap_jsonp_callback => 1;

triggers query_lc  => qr/(^rs[0-9]+)$/;

handle query_nowhitespace => sub {
    return $_ if $_;
    return;
};

1;
