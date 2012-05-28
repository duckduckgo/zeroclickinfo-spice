package DDG::Spice::Hayoo;

use DDG::Spice;

triggers start => "hayoo";

spice to => 'http://holumbus.fh-wedel.de/hayoo/hayoo.json?query=$1';
spice wrap_jsonp_callback => 1;

spice proxy_cache_valid => "200 1d";

handle remainder => sub {
    return $_ if $_;
    return;
};

1;

