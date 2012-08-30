package DDG::Spice::HqTemp;

use DDG::Spice;

spice to => 'YOUR_URL_HERE';
spice proxy_cache_valid => "418 1d";
spice wrap_jsonp_callback => 1;
triggers startend => "temperature at duckduckgo";

handle remainder => sub {
    return $_;
};

1;
