package DDG::Spice::Hayoo;

use DDG::Spice;

primary_example_queries "hayoo Prelude.map";
description "Search Haskell APIs";
name "Hayoo";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Hayoo.pm";
icon_url "/i/hackage.haskell.org.ico";
topics "programming", "sysadmin";
category "programming";
attribution github => ['https://github.com/headprogrammingczar','headprogrammingczar'];

triggers start => "hayoo", "haskell api";

spice to => 'http://holumbus.fh-wedel.de/hayoo/hayoo.json?query=$1';
spice wrap_jsonp_callback => 1;

spice proxy_cache_valid => "200 1d";

handle remainder => sub {
    return $_ if $_;
    return;
};

1;