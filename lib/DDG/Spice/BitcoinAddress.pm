package DDG::Spice::BitcoinAddress;
# ABSTRACT: Displays information about a bitcoin block using the biteasy.com API.

use strict;
use DDG::Spice;

triggers query_raw => qr/^(?:bitcoin address|btc address)?\s*([13][1-9A-HJ-NP-Za-km-z]{26,33})$/;
# This regular expression parses a valid Bitcoin Address

spice to => 'https://api.biteasy.com/blockchain/v1/addresses/$1?api_key={{ENV{DDG_SPICE_BITEASY_APIKEY}}}';

spice wrap_jsonp_callback => 1;

spice proxy_cache_valid => "418 1d";

handle query_raw => sub {
    return $1 if $1;
    return;
};

1;
