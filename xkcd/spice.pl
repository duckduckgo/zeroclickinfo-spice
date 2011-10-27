if ($q_exists eq 'xkcd' || $q_check_lc =~ /^xkcd (\d+)$/i) {
    $call_extf = qq(/js/nrxk102.js);
    if ($1) {
	$call_ext = qq(/ixk/$1);
    } else {
	$call_ext = qq(/ixk);
    }
    $is_kill_pre_results = 1;
}
