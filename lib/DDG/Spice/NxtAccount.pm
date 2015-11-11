package DDG::Spice::NxtAccount;
# ABSTRACT: Displays information about an Nxt account using the myNXT.info API.

use DDG::Spice;

triggers query_lc => qr/^nxt-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{5}$/;
# This regular expression parses a valid Nxt Account

spice to => 'https://wallet.mynxt.info/api/0.1/nxt?email={{ENV{DDG_SPICE_MYNXT_EMAIL}}}&password={{ENV{DDG_SPICE_MYNXT_PASS}}}&requestType=getAccount&account=$1';

spice wrap_jsonp_callback => 1;

handle query_raw => sub {    
    return $_ if $_;
    return;
};

1;
