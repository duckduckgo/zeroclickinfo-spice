package DDG::Spice::Twitter;

use DDG::Spice;

triggers start => "@";
handle query_lc => sub {
    if ($_ =~ /^@([^\s]+)$/i) {
	if ($1) {
	    $return qq(/itr/$1);
	}
#	$is_kill_pre_results = 1;
    }
};
1;
