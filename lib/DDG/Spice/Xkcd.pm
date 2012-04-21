package DDG::Spice::Xkcd;

use DDG::Spice;

triggers startend => "xkcd";
spice to => '/api-0/jsonp/comic/$1?callback={{callback}}';

handle query_lc => sub {
    if ($_ eq 'xkcd' || $_ =~ /^xkcd (\d+)$/) {
	if ($1) {
	    return $1;
	} else {
	    return '';
	}
    }
};

1;
