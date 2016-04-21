package DDG::Spice::Rfc;
# ABSTRACT: Search for Request for Comments documents.

use DDG::Spice;

spice is_cached => 1;
spice proxy_cache_valid => "200 1d";

spice wrap_jsonp_callback => 1;

spice to => 'https://rfcsearch-gorun.rhcloud.com/?q=$1';

triggers startend => 'rfc';

handle remainder => sub {
    return $_ if $_;
    return;
};

1;
