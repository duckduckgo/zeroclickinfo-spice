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
code_url "https://github.com/duckduckgo/zeroclickinfo-goodie/blob/master/lib/DDG/Spice/TodayInHistory.pm";
attribution github => ["https://github.com/killerfish", "Usman Raza"],
            twitter => ["https://twitter.com/f1shie", "Usman Raza"];

spice to => 'http://en.wikipedia.org/w/api.php?action=query&titles=$1&redirects&prop=revisions&format=json&prop=extracts&explaintext&callback={{callback}}';

triggers startend => "today in history";
triggers start => "historical events on", "this day in history";

# define variables
my $currentDay, my $currentMonth, my $currentYear;
my $givenDay, my $givenMonth, my $month;
my $parameter1, my $parameter2;
my %days = ('1'=>'31','2'=>'29','3'=>'31','4'=>'30','5'=>'31','6'=>'30','7'=>'31','8'=>'31','9'=>'30','10'=>'31','11'=>'30','12'=>'31');

# functions:
# check and process if we got 2 parameters (month and day)
sub readParameters {
  	if ($parameter2) {
    		# e.g. "historical events on June 12"
    		return 1 if((readMonth($parameter1)) && (readDay($parameter2)));
    		# e.g. "historical events on 16 Sep"
    		return 1 if((readMonth($parameter2)) && (readDay($parameter1)));
   	} 
  	# no parameter -> "today in history"
   	else {
   		useToday();
    		return 1;
  	}
  	return;
}

# check if parameter is a valid month (using strptime to allow different notations)
sub readMonth {
  	# month name as full name (April), in abbreviated form (Apr) or as 2 digit (04) 
  	my @monthPatterns = ('%B', '%b', '%m');

  	for my $monthPattern (@monthPatterns) {
    		return 1 if(eval {
      			my $validDate = Time::Piece->strptime("2000/$_[0]/1", "%Y/".$monthPattern."/%d");
      			$givenDay = 0;
      			$month = $validDate->mon;
      			$givenMonth = $validDate->fullmonth;
    		})
  	}
}

# check if parameter is a valid day (given month)
sub readDay {
		return 0 if($_[0] =~ m/\D+/);
      		return 0 if($_[0] > 31 || $_[0] > $days{$month});
		if($_[0] =~ m/^0{1}([1-9]){1}$/)
		{
        		$givenDay = $1;
		} 
		else {
      			$givenDay = $_[0];
		}
		return 1;
}

# use today's date if no parameter passed
sub useToday {
  	$givenDay = $currentDay;
  	$givenMonth = $currentMonth;
}

handle remainder => sub {
	# check current date in users timezone
        my $t = DateTime->now;
        $t->set_time_zone($loc->time_zone);
        $currentDay = $t->mday;
        $currentMonth = $t->month_name;

	# read parameters - do not trigger if invalid parameters are found (delimiters: - / . ' ')
  	($parameter1, $parameter2) = split (/[-\/. ]/, $_);
  	return if (!readParameters());
	return $givenDay."_".$givenMonth;
};	
1;
