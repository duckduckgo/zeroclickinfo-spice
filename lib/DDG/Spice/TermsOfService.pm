package DDG::Spice::TermsOfService;

# ABSTRACT: Provide definitions and meanings for emoji characters.

use strict;
use utf8;
use DDG::Spice;

spice is_cached => 1;
spice proxy_cache_valid => "200 1d";

spice wrap_jsonp_callback => 1;

spice to => 'https://tosdr.org/api/1/service/$1.json';


triggers startend => "terms of service", "summary tos";


handle remainder => sub {
    return $_ if $_;
    return;
};

1;