package DDG::Spice::RandWord;
use DDG::Spice;

triggers any => "random", "word";
#spice is_memcached => 0;
handle query_lc => sub {
    if ($_ =~ /^random word(?: ([0-9]+\-[0-9]+)|)$/) {
	if ($1) {
	    return qq(/iwrd/$1);
	} else {
	    return qq(/iwrd/);
	}
#	$is_kill_pre_results = 1;
    }
};
1;
