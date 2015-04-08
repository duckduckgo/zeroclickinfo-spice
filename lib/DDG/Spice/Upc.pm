package DDG::Spice::Upc;

use DDG::Spice;

attribution
    github => "iambibhas",
    twitter => "bibhasdn",
    web => "https://bibhas.in";

triggers any => "upc", "upc code";

spice to => 'http://api.upcdatabase.org/json/{{ENV{DDG_SPICE_UPC_APIKEY}}}/$1';
spice wrap_jsonp_callback => 1;
spice is_cached => 1;
spice proxy_cache_valid => "200 1d";

handle remainder => sub {
    return $_ if $_ =~ /^(\d+)$/;
    return;
};

1;
