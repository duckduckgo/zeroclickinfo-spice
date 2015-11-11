package DDG::Spice::BitcoinTransaction;
# ABSTRACT: Displays information about a bitcoin transaction using the biteasy.com API.

use strict;
use DDG::Spice;

triggers query_raw => qr/^(?:bitcoin transaction|btc transaction)?\s*([a-fA-F0-9]{64})$/;
# This regular expression parses a valid bitcoin block

spice to => 'https://api.biteasy.com/blockchain/v1/transactions/$1?api_key={{ENV{DDG_SPICE_BITEASY_APIKEY}}}';

spice wrap_jsonp_callback => 1;

spice proxy_cache_valid => "418 1d";

handle query_raw => sub {
    return $1 if $1;
    return;
};

1;
