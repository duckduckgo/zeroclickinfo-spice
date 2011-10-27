# Twitter.
if ($q_check_lc =~ /^@([^\s]+)$/i) {
    if ($1) {
	$call_extf = qq(/js/nrtr.js);
	$call_ext = qq(/itr/$1);
    }
    $is_kill_pre_results = 1;
}
