if ($q_check_lc =~ /cost of living/) {
    $call_extf = qq(/js/nrexp.js);
    if ($1) {
	$call_ext = qq(/iexp/$1);
    }
}
