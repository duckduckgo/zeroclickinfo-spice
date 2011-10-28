if ($q_check_lc =~ /cost of living/i) {
    $call_extf = qq(/js/nrexp102.js);
    if ($1) {
			$call_ext = qq(/iexp/$1);
    }
    $is_kill_pre_results = 1;
}
