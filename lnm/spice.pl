# LYRICSnMUSIC
if ($q_check_lc =~ /^(.*)\slyrics?$/i) {
  if ($1) {
    $call_extf = qq(/js/nrlnm.js);
    $call_ext = qq(/ilnm/$1);
  }
  $is_kill_pre_results = 1;
}
