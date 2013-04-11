package DDG::Spice::Lastfm::EventsLocation;
# ABSTRACT: Search for music shows near the user location.

use DDG::Spice;

spice to => 'http://ws.audioscrobbler.com/2.0/?format=json&method=geo.getevents&location=$1&api_key={{ENV{DDG_SPICE_LASTFM_APIKEY}}}&callback={{callback}}';

triggers any => "concerts", "gig", "gigs", "shows";

handle query_lc => sub {
   my $query = $_;
   if($query =~ /^(concerts?|music shows?|shows?|gigs)( near(by)?( me)?)?$/) {
      return;
   } elsif($query =~ /^(?:concerts?|music shows?|shows?|gigs) (?:in|near|at) (.+)$/){
      return $1;
   }
   return;
};

1;
