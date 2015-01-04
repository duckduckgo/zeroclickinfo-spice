package DDG::Spice::TodayInHistory;
# ABSTRACT: List events which occured in history given current day

use DDG::Spice;
use DateTime;
use DateTime::TimeZone;
use Time::Piece;

name "TodayInHistory";
source "http://wikipedia.com";
description "List of events which occured on this day in history";
primary_example_queries "today in history", "this day in history";
secondary_example_queries "historical events on 27 June";
category "dates";
topics "everyday","trivia";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/TodayInHistory.pm";
attribution github => ["https://github.com/killerfish", "Usman Raza"],
            twitter => ["https://twitter.com/f1shie", "Usman Raza"];

spice to => 'http://en.wikipedia.org/w/api.php?action=query&titles=$1&redirects&prop=revisions&format=json&prop=extracts&explaintext&callback={{callback}}';

triggers startend => "today in history";
triggers start => "historical events on", "this day in history";

# define variables
my %days = ('1'=>'31','2'=>'29','3'=>'31','4'=>'30','5'=>'31','6'=>'30','7'=>'31','8'=>'31','9'=>'30','10'=>'31','11'=>'30','12'=>'31');

# functions:
# check and process if we got 2 parameters (month and day)
sub readParameters {	
	# read parameters - do not trigger if invalid parameters are found (delimiters: - / . ' ')
  	my ($parameter1, $parameter2) = split (/[-\/. ]/, $_[0]);
  	if ($parameter2) {
		my $value;
    		# e.g. "historical events on June 12"
    		return $value if (($value = readparams($parameter1, $parameter2)) ne 'fail');
    		# e.g. "historical events on 16 Sep"
    		return $value if (($value = readparams($parameter2, $parameter1)) ne 'fail');
   	} 
  	# no parameter - use today date
   	else {
   		return useToday();
  	}
  	return;
}

# validate parameters and return day_month on success
sub readparams {
	my $givenDay, my $givenMonth, my $month, my $evalfail;
  	# month name as full name (April), in abbreviated form (Apr) or as 2 digit (04) 
  	my @monthPatterns = ('%B', '%b', '%m');
  	for my $monthPattern (@monthPatterns) {
      		$evalfail = 1 if ( eval {
			my $validDate = Time::Piece->strptime("2000/$_[0]/1", "%Y/".$monthPattern."/%d");
      			$givenDay = 0;
      			$month = $validDate->mon;
      			$givenMonth = $validDate->fullmonth;
		})	
  	}
	return 'fail' if(!$evalfail);
	return 'fail' if($_[1] =~ m/\D+/);
      	return 'fail' if($_[1] > 31 || $_[1] > $days{$month});
	if($_[1] =~ m/^0{1}([1-9]){1}$/) {
        	$givenDay = $1;
	} else {
      		$givenDay = $_[1];
	}
	return $givenDay."_".$givenMonth;
}

# use today's date if no parameter passed
sub useToday {
        my $t = DateTime->now;
        $t->set_time_zone($loc->time_zone);
	return $t->mday."_".$t->month_name;
}

handle remainder => sub {
	# check current date in users timezone
  	if (my $var = readParameters($_)) {
		return $var;
	}
	return;
};	
1;
