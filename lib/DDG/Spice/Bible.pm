package DDG::Spice::Bible;

use DDG::Spice;
triggers any => "bible";

handle query_lc => sub {

    if ($_ =~ /^bible (\w+)$/) {
	if ($1) {
	    return qq(/ibi/$1);
	}
#	$is_kill_pre_results = 1;
    }
    return;
};
1;
