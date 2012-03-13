if ($q_check_lc =~ /^(?:(free|opensource|commercial))?\s*(?:alternatives?\s*to\s*)?([\w\-]+)(?:\sfor\s(.*))?$/i) {
    #$call_extf = qq(/js/nrat.js);
    if ($1 and $4) {
        # license and platform specified - queries like:
        # -> free alternative to firefox for mac
        # -> opensource matlab for linux
        $call_ext = qq(/iat/software/$3/?platform=$4&license=$1);
    } elsif ($1) {
        # lincense secified only:
        # -> free nod32
        # -> opensource alternative to omnigraffle
        $call_ext = qq(/iat/software/$3/?license=$1);
    } elsif ($4) {
        # platform specified:
        # -> TextMate for windows
        # -> alternative to vim for linux
        $call_ext = qq(/iat/software/$3/?platform=$4);
    } elsif($2) {
        # license and platform not specified
        # in this case we need to match 'alternative(s) to':
        # -> alternative to firefox
        $call_ext = qq(/iat/software/$3);
    }   
    $is_kill_pre_results = 1;
}

