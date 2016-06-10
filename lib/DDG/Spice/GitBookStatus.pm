package DDG::Spice::GitBookStatus;
# ABSTRACT: Search for the current status of GitBook

use DDG::Spice;

spice is_cached => 1;
spice proxy_cache_valid => "200 5m";

spice wrap_jsonp_callback => 1;

spice to => 'http://status.gitbook.com/index.json';

triggers any => 'gitbook';

handle remainder => sub {
    return $_ if m/^(is\s*)?(system)?\s*(status|up|down)\s*(of\s*)?$/i; #return if query contains (system) status; status of; etc
    return;
};

1;
