package DDG::Spice::BitcoinBlock;
# ABSTRACT: Displays information about a bitcoin block using the biteasy.com API.

use DDG::Spice;

primary_example_queries "000000000000000000935d5053d80266447a6cc180e488bbb85675ca61cddfe7", 
                        "000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f", 
                        "000000000000000040cd080615718eb68f00a0138706e7afd4068f3e08d4ca20";

description "Display information about a Bitcoin block";
name "Bitcoin Block Info";
source "https://api.biteasy.com";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/BitcoinBlock.pm";
topics "economy_and_finance";
category "finance";
icon_url "https://www.biteasy.com/favicon.ico";

attribution github => ['https://github.com/biteasy','biteasy.com'],
            email => ['support@biteasy.com','info@biteasy.com'],
            twitter => "biteasy",
            web => ['https://biteasy.com','biteasy.com'];
            
triggers query_raw => qr/^(?:bitcoin block|btc block)?\s*(0{8}[a-fA-F0-9]{56})$/;
# This regular expression parses a valid bitcoin block

spice to => 'https://api.biteasy.com/blockchain/v1/blocks/$1?api_key={{ENV{DDG_SPICE_BITEASY_APIKEY}}}';

spice wrap_jsonp_callback => 1;

handle query_raw => sub {
    return $1 if $1;
    return;
};

1;