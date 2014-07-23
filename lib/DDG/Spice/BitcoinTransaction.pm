package DDG::Spice::BitcoinTransaction;
# ABSTRACT: Displays information about a bitcoin transaction using the biteasy.com API.

use DDG::Spice;

primary_example_queries "0e40627940d835d7154dcce33d6755f7ec40c7cc9e88d86291a971567bcd7ea7", 
                        "b1956e97661f91ab020f97dff96b8043602dcbdc23d0825f790b521221bef1f5", 
                        "b6f952bcb5e0f2da3726f7ecc1101afcc18248229ea57abcca7e2542f323ae7d";

description "Display information about a Bitcoin Transaction";
name "Bitcoin Transaction Info";
source "https://api.biteasy.com";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/BitcoinTransaction.pm";
topics "economy_and_finance";
category "finance";
icon_url "https://www.biteasy.com/favicon.ico";

attribution github => ['https://github.com/biteasy','biteasy.com'],
            email => ['support@biteasy.com','info@biteasy.com'],
            twitter => "biteasy",
            web => ['https://biteasy.com','biteasy.com'];
            
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