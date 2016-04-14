package DDG::Spice::Piratetalk;

# ABSTRACT: Piratetalk will translate texts into Pirate language when triggered with the trigger words mentioned below. 
# For example, "Pirate Speak Hello" will return "Ahoy!" 

use DDG::Spice;

spice is_cached => 1;
spice proxy_cache_valid => "200 1d"; 
spice wrap_jsonp_callback => 1; 

spice to => 'https://pirate-speak.herokuapp.com/piratespeak?text=$1';

triggers any => 'pirate talk', 'pirate speak', 'translate to pirate';

handle remainder => sub {
    return $_ if $_;
    return;
};

1;
