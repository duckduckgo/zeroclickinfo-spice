package DDG::Spice::Expatistan;

use DDG::Spice;

triggers any => "cost", "living";

handle query_lc => sub {
    if ($_ =~ /cost of living/) {
	if ($1) {
	    return qq(/iexp/$1);
	}
    }
    return;
};
1;
