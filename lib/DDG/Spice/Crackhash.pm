package DDG::Spice::Crackhash;

use DDG::Spice;
use strict; 

spice is_cached => 0;
spice proxy_cache_valid => "200 1d"; # defaults to this automatically

spice wrap_jsonp_callback => 0; # only enable for non-JSONP APIs (i.e. no &callback= parameter)
spice to => 'http://api.md5crack.com/crack/ZFCQCcpS1kLgbCQZ/$1';

triggers any => 'crackmyhash', 'crackhash' , 'crack hash' , 'crack';

handle remainder => sub {
   
    # Query is in $_...if you need to do something with it before returning
    return $_;
};

1;
