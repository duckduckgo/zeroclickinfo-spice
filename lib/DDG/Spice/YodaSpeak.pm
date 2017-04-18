package DDG::Spice::YodaSpeak;

# ABSTRACT: Yoda speak will translate to Yodish

use DDG::Spice;

spice is_cached => 1;
spice proxy_cache_valid => "200 1d"; 

spice wrap_jsonp_callback => 1; 

spice to => 'http://yoda-api.appspot.com/api/v1/yodish?text=$1';

triggers start => 'yoda speak', 'yoda talk', 'translate to yoda', 'translate to yodish', 'how does yoda say';
triggers end => 'to yoda', 'in yoda', 'to yodish', 'in yodish';

handle remainder => sub {
    return $_ if $_;
    return;
};

1;
