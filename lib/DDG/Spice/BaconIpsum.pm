package DDG::Spice::BaconIpsum;
# This Spice returns a number of BaconIpsum paragraphs

use DDG::Spice;

spice proxy_cache_valid => "200 1d";

name "BaconIpsum";
description "This Spice returns a number of BaconIpsum paragraphs";
primary_example_queries "baconipsum 4", "baconipsum 9";

code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/BaconIpsum.pm";
attribution github => ["puskin94", "puskin"];

triggers startend => "baconipsum";

spice to => 'http://baconipsum.com/api/?type=all-meat&paras=$1';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
	my $num = shift;
	return unless $num;
	return unless $num =~ qr/^\d+$/; 
	return $num;
    return $_;
};

1;
