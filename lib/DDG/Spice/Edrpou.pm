package DDG::Spice::Edrpou;

# ABSTRACT: Get information about Ukrainian companies by EDRPOU code

use DDG::Spice;
use strict;
use warnings;

# Caching - http://docs.duckduckhack.com/backend-reference/api-reference.html#caching
spice is_cached => 1;
spice proxy_cache_valid => '200 10d'; # defaults to this automatically

spice wrap_jsonp_callback => 1;

spice to => 'https://edr.data-gov-ua.org/api/companies?where={%22edrpou%22:%22$1%22}';

# Triggers - https://duck.co/duckduckhack/spice_triggers
triggers startend => "EDRPOU","ЄДРПОУ","ЄДР","edrpou", "єдрпоу", "єдр";

# Handle statement
handle remainder => sub {
    # Trigger if query includes an 8 digit number
    return $_ if $_ =~ /\d{8}/;
    return;
};

1;
