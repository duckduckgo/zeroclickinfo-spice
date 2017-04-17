package DDG::Spice::Doi;

use DDG::Spice;

# Regex from http://stackoverflow.com/a/10324802/946226
triggers query_lc => qr%\b(10[.][0-9]{4,}(?:[.][0-9]+)*/(?:(?!["&\'<>])\S)+)\b%;

spice to => 'http://api.crossref.org/works/$1/transform/application/vnd.citationstyles.csl+json';
spice wrap_jsonp_callback => 1;

spice is_cached => 1;
spice proxy_cache_valid => '200 7d';

handle matches => sub {
    return $_[0];
};

1;
