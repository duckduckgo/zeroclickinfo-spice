package DDG::Spice::Bitly;

use DDG::Spice;
use URI::Escape;

spice to => 'http://api.bitly.com/v3/shorten?login=djarvis270&apiKey=R_ef42d418c7e0ca65f81d00963a822b90&longUrl=$1&callback={{callback}}';

triggers start => 'bitly';

handle remainder => sub {
	my ($longUri) = @_;
	return $longUri if $longUri;
	return;
};

1;
