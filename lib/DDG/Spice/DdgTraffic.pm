package DDG::Spice::DdgTraffic;

use DDG::Spice;

spice is_cached => 1;
spice proxy_cache_valid => "200 1d";

spice wrap_jsonp_callback => 1;

spice to => 'https://duckduckgo.com/traffic_data/direct.json';

triggers start =>
    'duckduckgo traffic', 'ddg traffic',
    'duckduckgo traffic graph', 'ddg traffic graph',
    'duckduckgo traffic numbers', 'ddg traffic numbers';

handle remainder => sub {
    return if $_;
    return 1;
};

1;
