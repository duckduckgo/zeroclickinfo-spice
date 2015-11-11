package DDG::Spice::BitcoinBlock;
# ABSTRACT: Displays information about a bitcoin block using the biteasy.com API.

use strict;
use DDG::Spice;

triggers query_raw => qr/^(?:bitcoin block|btc block)?\s*(0{8}[a-fA-F0-9]{56})$/;
# This regular expression parses a valid bitcoin block

spice to => 'https://api.biteasy.com/blockchain/v1/blocks/$1?api_key={{ENV{DDG_SPICE_BITEASY_APIKEY}}}';

spice wrap_jsonp_callback => 1;

handle query_raw => sub {
    return $1 if $1;
    return;
};

1;
