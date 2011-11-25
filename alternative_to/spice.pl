if ($q_check =~ /^alternatives? to ([\w\-]+)$/) {
  #$call_extf = qq(/js/nrxk102.js);
  if ($1) {
    $call_ext = qq(/iat/software/$1);
  }
  $is_kill_pre_results = 1;
}

