package DDG::Spice::Bitly;

use DDG::Spice;

spice to => 'http://api.bitly.com/v3/shorten?login=ddgspiceplugin&apiKey=R_2cbfeea1621c9f7795e8413356cfde46&longUrl=$1&callback={{callback}}';

triggers start => 'bitly', 'bit.ly', 'shorten', 'shorten url', 'short url', 'url shorten';

handle remainder => sub {
	my ($longUri) = shift;
	if ($longUri) {
		if (!($longUri =~ /^https?:\/\//)) {
			$longUri = 'http://' . $longUri;
		}
		return $longUri;
	}
	return;
};

1;
