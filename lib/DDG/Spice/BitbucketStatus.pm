package DDG::Spice::BitbucketStatus;
# ABSTRACT: Returns the status of Bitbucket

use DDG::Spice;
use Text::Trim;

spice is_cached => 1;
spice proxy_cache_valid => "200 5m";

spice wrap_jsonp_callback => 1;

spice to => 'http://status.bitbucket.org/index.json';

triggers any => 'bitbucket', 'bb';

handle remainder => sub {
    return $_ if m/^(is\s*)?(system)?\s*(status|up|down)\s*(of\s*)?$/i; # return if query contains (system) status, up or down; (system) status of and etc
    return;
};

1;
