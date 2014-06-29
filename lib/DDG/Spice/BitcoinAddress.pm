package DDG::Spice::BitcoinAddress;
# ABSTRACT: Displays information about a bitcoin block using the biteasy.com API.

use DDG::Spice;

primary_example_queries "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa", 
                        "1Biteasym3p5E4soZq8So6NjkjYugEnz2X", 
                        "1J6EZsQLTppftPTbqYbbRDYFJMW5Ex3Bqi";

description "Display information about a Bitcoin Address";
name "Bitcoin Address Info";
source "https://api.biteasy.com";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/BitcoinAddress.pm";
topics "economy_and_finance";
category "finance";
icon_url "https://www.biteasy.com/favicon.ico";

attribution github => ['https://github.com/biteasy','biteasy.com'],
            email => ['support@biteasy.com','info@biteasy.com'],
            twitter => "biteasy",
            web => ['https://biteasy.com','biteasy.com'];
            
triggers query_raw => qr/^[13][1-9A-HJ-NP-Za-km-z]{26,33}$/;
# This regular expression parses a valid Bitcoin Address

spice to => 'https://api.biteasy.com/blockchain/v1/addresses/$1?api_key={{ENV{DDG_SPICE_BITEASY_APIKEY}}}';

spice wrap_jsonp_callback => 1;

spice proxy_cache_valid => "418 1d";

handle query_raw => sub {    
    return $_ if $_;
    return;
};

1;