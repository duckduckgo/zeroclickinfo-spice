package DDG::Spice::Xkcd;

use DDG::Spice;

triggers startend => "xkcd";

handle query_lc => sub {
    if ($_ eq 'xkcd' || $_ =~ /^xkcd (\d+)$/) {
	if ($1) {
	    $return = qq(/ixk/$1);
	} else {
	    $return = qq(/ixk);
	}
    }
};

1;
