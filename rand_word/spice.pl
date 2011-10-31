if ($q_check =~ /^random word(?: ([0-9]+\-[0-9]+)|)$/i) {
    # not sure what that is for.
    #$call_extf = qq(/js/nrxk102.js);
    if ($1) {
	$call_ext = qq(/iwrd/$1);
    } else {
	$call_ext = qq(/iwrd/);
    }
    $is_kill_pre_results = 1;
}
