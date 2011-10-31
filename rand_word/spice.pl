if ($q_check_lc =~ /^random word(?: ([0-9]+\-[0-9]+)|)$/) {

    $call_extf = qq(/js/nrwrd.js);
    if ($1) {
	$call_ext = qq(/iwrd/$1);
    } else {
	$call_ext = qq(/iwrd/);
    }
    $is_kill_pre_results = 1;
    $is_memcached = 0;
}
