package DDG::Spice::PirateSpeak;

# ABSTRACT: Piratetalk will translate texts into Pirate language when triggered with the trigger words mentioned below.

use DDG::Spice;

spice is_cached => 1;
spice proxy_cache_valid => "200 1d"; 

spice wrap_jsonp_callback => 1; 

spice to => 'https://pirate-speak.herokuapp.com/piratespeak?text=$1';

triggers start => 'pirate talk', 'pirate speak', 'translate to pirate';
triggers end => 'to pirate', 'in pirate';

handle remainder => sub {
    return $_ if $_;
    return;
};

1;
