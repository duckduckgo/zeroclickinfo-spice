package DDG::Spice::YachtSpecs;
# ABSTRACT: Returns information of Yacht 

use DDG::Spice;


spice is_cached => 1; 

#Connection to API
spice to => 'https://yachtharbour.com/tools/api.php?name=$1';
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
