package DDG::Spice::Hayoo;
# ABSTRACT: Spice to search Haskell APIs

use DDG::Spice;

triggers start => "hayoo", "hayoo api";

spice to => 'http://hayoo.fh-wedel.de/json?query=$1';
spice wrap_jsonp_callback => 1;

spice proxy_cache_valid => "200 1d";

handle remainder => sub {
    return $_ if $_;
    return;
};

1;
