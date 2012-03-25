package DDG::Spice::Bible;

use DDG::Spice;

triggers start => "bible";

handle query_lc => sub {

    if ($_ =~ /^bible\s+([a-z]+\s*?[0-9]+:[0-9]+)$/) {
	if ($1) {
	    return qq(/ibi/$1);
	}
#	$is_kill_pre_results = 1;
    }
    return;
};
1;
