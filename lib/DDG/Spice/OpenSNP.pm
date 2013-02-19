package DDG::Spice::OpenSNP;

use DDG::Spice;

spice to => 'http://opensnp.org/snps/json/annotation/$1.json';
spice is_cached => 1;
spice proxy_cache_valid  => "5m";
spice wrap_jsonp_callback => 1;

triggers query_lc  => qr/(^rs[0-9]+)$/;

handle query_nowhitespace => sub {
    return $_ if $_;
    return;
};
attribution github => ['https://github.com/drsnuggles','Philipp Bayer'],
               twitter => ['https://twitter.com/PhilippBayer'];
1;
