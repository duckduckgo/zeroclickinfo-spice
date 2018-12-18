package DDG::Spice::DdgTraffic;

# ABSTRACT: Write an abstract here

use DDG::Spice;

spice is_cached => 1;
spice proxy_cache_valid => "200 1d"; # defaults to this automatically

spice wrap_jsonp_callback => 1;

spice to => 'https://duckduckgo.com/traffic_data/direct.json';

triggers start =>
    'duckduckgo traffic', 'ddg traffic',
    'duckduckgo traffic graph', 'ddg traffic graph',
    'duckduckgo traffic numbers', 'ddg traffic numbers';

handle remainder => sub {
    return if $_; #query should only be trigger!
    return 1;
};

1;
