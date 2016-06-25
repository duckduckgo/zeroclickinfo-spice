package DDG::Spice::What3Words;

use DDG::Spice;
use Net::Domain::TLD qw(tld_exists);
use strict;

spice is_cached => 1;
spice proxy_cache_valid => "200 1d"; # defaults to this automatically

spice from => "([^/]+)/([^/]+)/([^/]+)";
spice to => 'https://api.what3words.com/v2/$1?key={{ENV{DDG_SPICE_W3W_APIKEY}}}&$2=$3&callback={{callback}}';

my $w3w_re   = qr/(?:(?:what ?(?:3|three) ?words|w3w)\s)/;
my $coord_re = qr/[+-]?[0-9]+(?:\.\d{1,6})?/;

# Handles queries like:
# what3words | w3w | what three words word.word.word
triggers query_lc => qr/^(?:$w3w_re)?(\p{L}{4,}+\.\p{L}{4,}+\.\p{L}{1,}+)$/i;

# Handles queries like:
# what3words | w3w | what three words +/-##.####, +/-###.#####
triggers query_lc => qr/^(?:$w3w_re)($coord_re), ?($coord_re)$/i;

handle matches => sub {
	my ($direction, $param, $remainder, $lat, $lon);

	if (scalar @_ == 1){
		$remainder = lc shift;
		my $end = pop @{[split(/\./, $remainder)]}; #split string into list, cast into array, pop last element
		return if tld_exists($end); #prevent searches for websites
		$direction = "forward";
		$param     = "addr";
	}
	else {
		$lat = shift;
		$lon = shift;
		return if abs $lat > 90 || abs $lon > 90;
		$remainder = "$lat,$lon";
		$direction = "reverse";
		$param     = "coords";
	}
	return $direction, $param, $remainder;
};

1;
