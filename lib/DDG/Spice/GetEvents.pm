package DDG::Spice::GetEvents;
#ABSTRACT: Returns events in a city either explicitly or with the location api.

use DDG::Spice;
use Text::Trim;


primary_example_queries "events in chicago","what to do in chicago","things to do in chicago","events near me";
secondary_example_queries "chicago events","chicago things to do";

description "Upcoming events from GetEvents";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/GetEvents1.pm";
category "entertainment";
topics "computing","entertainment","food_and_drink","music","science","special_interest","travel";

triggers startend => 'events near me','nearby events';
triggers start =>'events in','what to do in','things to do in';
triggers end => 'things to do','events';

spice to => 'https://api.getevents.co/ddg?city=$1';


spice wrap_jsonp_callback => 1;

my $pattern = '';
my @triggers = ('events in', 'what to do in', 'things to do in','things to do', 'events');

handle query_lc => sub {
    my $query = $_;
    if (($query eq 'events near me') || ($query eq 'nearby events')) {
        # Verifying that $loc and the relevant geo attributes (city) are valid.
        return unless $loc && $loc->city ;
        
        my $city = $loc->city;
        return $city, {is_cached => 0};
    } 
    else {
    
        # Check for and remove trigger words
        foreach $pattern ( @triggers ) {
             s/$pattern//g ;
        }
        
        my $query = trim($_); 
        return $query if $query;
        return;
    }
};

1;
