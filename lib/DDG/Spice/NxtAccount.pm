package DDG::Spice::NxtAccount;
# ABSTRACT: Displays information about an Nxt account using the myNXT.info API.

use DDG::Spice;

primary_example_queries "NXT-XXXX-XXXX-XXXX-XXXXX", 
                        "NXT-AR77-SW4Y-M3VA-DUSTY", 
                        "NXT-W6CT-NPDH-AAQW-HWCHA";

description "Display information about an Nxt Account";
name "Nxt Account Info";
source "https://wallet.mynxt.info/api/0.1/";
code_url "https://github.com/toenu23/zeroclickinfo-spice/blob/master/lib/DDG/Spice/NxtAddress.pm";
topics "economy_and_finance";
category "finance";
icon_url "https://mynxt.info/favicon.ico";

attribution github => ['https://github.com/toenu23','toenu'];
            
triggers query_lc => qr/^nxt-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{5}$/;
# This regular expression parses a valid Nxt Account

spice to => 'https://wallet.mynxt.info/api/0.1/nxt?email={{ENV{DDG_SPICE_MYNXT_EMAIL}}}&password={{ENV{DDG_SPICE_MYNXT_PASS}}}&requestType=getAccount&account=$1';

spice wrap_jsonp_callback => 1;

handle query_raw => sub {    
    return $_ if $_;
    return;
};

1;
