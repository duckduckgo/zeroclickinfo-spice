package DDG::Spice::Expatistan;

use DDG::Spice;

triggers any => "cost", "living";

spice to => 'http://www.expatistan.com/api/spice?q=$1&api_key=wideopen';

handle query_lc => sub {
    if ($_ =~ /cost of living/) {
	    return $1 if $1;
    }
    return;
};

1;
