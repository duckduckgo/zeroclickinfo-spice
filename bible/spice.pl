if ($q_check_lc =~ /^bible(\s*)(\d*)(\s+)(\w+)(\s+)(\d+)(:+)(\d+)$/) {
    if ($1) {
    $call_extf = qq(/js/nrbi.js);
    $call_ext = qq(/ibi/$1);
    }
    $is_kill_pre_results = 1;
}
