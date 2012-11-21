package DDG::Spice::Bitly;

use DDG::Spice;
use URI::Escape;

spice to => 'http://api.bitly.com/v3/shorten?login=ddgspiceplugin&apiKey=R_2cbfeea1621c9f7795e8413356cfde46&longUrl=$1&callback={{callback}}';

triggers start => 'bitly', 'bit.ly', 'shorten', 'shorten url', 'short url', 'url shorten';

handle remainder => sub {
	my ($longUri) = @_;
	return $longUri if $longUri;
	return;
};

1;
