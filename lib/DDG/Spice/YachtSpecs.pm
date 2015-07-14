package DDG::Spice::YachtSpecs;
# ABSTRACT: Returns information of Yacht 

use DDG::Spice;


spice is_cached => 1; 

#General attributes for meta data
name "YachtSpecs";
source "http://yachtharbour.com";
icon_url "http://yachtharbour.com/favicon.ico";
description "Gives out yacht specifications and photo";
primary_example_queries "yacht azzam", "lady moura yacht";
category "facts";
topics "special_interest","travel","trivia";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/YachtSpecs.pm";
attribution web => ["http://YachtHarbour.com"],
            twitter => "yachtharbour";

#Connection to API
spice to => 'http://yachtharbour.com/tools/api.php?name=$1';
spice wrap_jsonp_callback => 1;

#Triggers
triggers startend => "yacht", "superyacht", "megayacht", "luxury yacht", "motor yacht";
my $skip = join "|", share('skipwords.txt')->slurp(chomp => 1);

# Handle statement
handle remainder => sub {
    return unless $_; 
    # Do not trigger IA if query matches any words in skipwords.txt file
    return if  m/$skip/i;  
    return $_;
};

1;
