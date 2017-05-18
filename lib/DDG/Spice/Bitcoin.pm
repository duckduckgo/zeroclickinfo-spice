package DDG::Spice::Bitcoin;
# ABSTRACT: Display bitcoin address balance, transaction or block information
use strict;
use DDG::Spice;

my $addressTriggers = '^(?:bitcoin address|btc address)?\s*([13][1-9A-HJ-NP-Za-km-z]{26,33})$';
my $txTriggers = '^(?:bitcoin transaction|btc transaction)?\s*([a-fA-F0-9]{64})$';
my $blockTriggers = '^(?:bitcoin block|btc block)?\s*(0{8}[a-fA-F0-9]{56})$';

triggers query_raw => qr/$addressTriggers|$txTriggers|$blockTriggers/;

spice to => 'https://btc.blockr.io/api/v1/$1/info/$2';

spice from => '(.*)/(.*)';

spice wrap_jsonp_callback => 1;

spice proxy_cache_valid => "418 1d";

handle query_raw => sub { 
    return unless $_;
    #remove trigger words
    s/(b[a-z]{0,7})\s(transaction|block|address)\s+|//g; 
    # switch api endpoints based on query
    return "address", $_ if m/$addressTriggers/; 
    return "block", $_ if m/$blockTriggers/;
    return "tx", $_ if m/$txTriggers/;
};

1;
