package DDG::Spice::BaconIpsum;
# ABSTRACT: Generator of BaconIpsum paragraphs

use strict;
use DDG::Spice;

spice proxy_cache_valid => "418 1d";

triggers startend => "baconipsum" , "bacon ipsum";

spice to => 'http://baconipsum.com/api/?callback={{callback}}&type=all-meat&paras=$1';

handle remainder => sub {
    my $num = shift;

    if (!($num)) {
        $num = 1;
    }
    return unless $num && $num =~ qr/^\d+$/;
    return $num;
    return $_;
};

1;
