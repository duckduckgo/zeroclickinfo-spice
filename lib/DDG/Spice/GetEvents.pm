package DDG::Spice::GetEvents;
#ABSTRACT: Returns events in a city either explicitly or with the location api.

use DDG::Spice;
use Text::Trim;

triggers startend => 'events near me','nearby events';
triggers start =>'events in','what to do in','things to do in';
triggers end => 'things to do','events';

spice to => 'https://api.getevents.co/ddg?city=$1&country=$2';
spice from => "(.+)/(.*)";

spice wrap_jsonp_callback => 1;

my $pattern = '';
my @triggers = ('events in', 'what to do in', 'things to do in','things to do', 'events');

handle query_lc => sub {
    my $re = '^(\b[a-zA-Z]+\b\s*\b[a-zA-Z]*\b),?\s*(\b[a-zA-Z]*\b\s*\b[a-zA-Z]*\b)$' ;
    my $query = $_;
    my $c = '';
    if (($query eq 'events near me') || ($query eq 'nearby events')) {
        # Verifying that $loc and the relevant geo attributes (city) are valid.
        return unless $loc && $loc->city ;
        
        my $city = $loc->city;
        return $city,'', {is_cached => 0};
    } 
    else {
    
        # Check for and remove trigger words
        foreach $pattern ( @triggers ) {
             s/$pattern//g ;
        }
        
        # Triming string and breaking it by city, country/state
        my $query = trim($_); 
        $query =~ /^(\b[a-zA-Z]+\b\s*\b[a-zA-Z]*\b),?\s*(\b[a-zA-Z]*\b\s*\b[a-zA-Z]*\b)$/ ;

        return $1,$2 if $1;
        return;
    }
};

1;
