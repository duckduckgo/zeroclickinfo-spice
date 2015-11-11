package DDG::Spice::BitcoinBalance;
# ABSTRACT: Displays the balance of a Bitcoin address from the Chain.com API.

use strict;
use DDG::Spice;

triggers query_raw => qr/^[13][1-9A-HJ-NP-Za-km-z]{26,33}$/;
# This regular expression identifies the unique properties of a Bitcoin Address.

spice to => 'https://api.chain.com/v1/bitcoin/addresses/$1?key={{ENV{DDG_SPICE_BITCOIN_APIKEY}}}';
# The Chain API requires an API key. Chain has granted the spice a free account with unlimited access. We can provide this to DuckDuckGo before release.

spice wrap_jsonp_callback => 1;

spice proxy_cache_valid => "418 1d";

handle query_raw => sub {
    return $_;
};

1;
