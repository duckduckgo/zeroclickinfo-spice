package DDG::Spice::BitcoinBalance;
# ABSTRACT: Displays the balance of a Bitcoin address from the Chain.com API.

use DDG::Spice;

primary_example_queries "17x23dNjXJLzGMev6R63uyRhMWP1VHawKc", "1Gn2dRFqouUHvuWPVhriCDtP3qVQc59WHy", "3QJmV3qfvL9SuYo34YihAf3sRCW3qSinyC";
description "Display the balance of a Bitcoin address";
name "Bitcoin Address Balance";
source "http://chain.com";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/BitcoinBalance.pm";
topics "economy_and_finance";
category "finance";
icon_url "https://chain.com/chain32x32.ico";

attribution github => ['https://github.com/chain-engineering','chain.com'],
            email => ['hello@chain.com','hello@chain.com'],
            twitter => "chain",
            web => ['https://chain.com','chain.com'];
            
triggers query_raw => qr/^[13][1-9A-HJ-NP-Za-km-z]{26,33}$/;
// This regular expression identifies the unique properties of a Bitcoin Address.

spice to => 'https://{{ENV{BITCOIN_BALANCE_SPICE_APIKEY}}}@api.chain.com/v1/bitcoin/addresses/$1';
// The Chain API requires an API key. Chain has granted the spice a free account with unlimited access. We can provide this to DuckDuckGo before release.

spice wrap_jsonp_callback => 1;

spice is_cached => 0;

handle query_raw => sub {
    return $_;
};

1;