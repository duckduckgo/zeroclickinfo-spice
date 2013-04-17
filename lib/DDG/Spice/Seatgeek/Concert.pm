package DDG::Spice::Seatgeek::Concert;
# ABSTRACT: Search for music shows near the user location.

use DDG::Spice;

spice to => 'http://api.seatgeek.com/2/events?lon=$1&lat=$2&taxonomies.name=concert&callback={{callback}}&sort=score.desc';
spice from => '(.*?)/(.*)';

triggers any => "concerts", "gig", "gigs", "shows";

handle query_lc => sub {
   my $query = $_;
   if($query =~ /^(concerts?|music shows?|shows?|gigs)( near(by)?( me)?)?$/) {
      return ($loc->longitude, $loc->latitude);
   }
   return;
};

1;
