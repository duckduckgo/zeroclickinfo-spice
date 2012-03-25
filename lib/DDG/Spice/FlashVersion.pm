package DDG::Spice::FlashVersion;

use DDG::Spice;
triggers startend => "flash";

handle query_lc => sub {
    if ($_ eq 'flash version') {
	return qq(/js/nrfl.js);
#	$is_kill_pre_results = 1;
    }
};
1;
