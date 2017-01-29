package DDG::Spice::SunlightCampaignFinance;
# ABSTRACT: Give the number of characters (length) of the query.

use DDG::Spice;
use URI::Escape;

triggers start => 'sunlight';

spice to => 'http://transparencydata.com/api/1.0/entities.json?apikey=81ae602f16f34cbc9fe2643c7691f3d3&search=$1&callback={{callback}}';

handle remainder => sub {
	return uri_escape($_) if $_;
	return;
};

# zci is_cached => 1;

1;