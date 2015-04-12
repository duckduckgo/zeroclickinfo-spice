package DDG::Spice::BaconIpsum;
# ABSTRACT: Generator of BaconIpsum paragraphs

use strict;
use DDG::Spice;

spice proxy_cache_valid => "418 1d";

name "BaconIpsum";
description "This Spice returns a number of BaconIpsum paragraphs";
primary_example_queries "baconipsum 4", "baconipsum 9";

code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/BaconIpsum.pm";
attribution github => ["puskin94", "puskin"];

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
