package DDG::Spice::Xkcd;

use DDG::Spice;

triggers startend => "xkcd";

handle query_lc => sub {
    if ($_ eq 'xkcd' || $_ =~ /^xkcd (\d+)$/) {
	if ($1) {
	    $call_ext = qq(/ixk/$1);
	} else {
	    $call_ext = qq(/ixk);
	}
#	$is_kill_pre_results = 1;
    }
};

1;
