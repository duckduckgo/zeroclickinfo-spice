package DDG::Spice::Cryptomarketcap;

# ABSTRACT: Shows the marketcap for the main cryptocurrencies

use DDG::Spice;
use YAML::XS 'LoadFile';
use strict;
use warnings;

spice is_cached => 1;
spice proxy_cache_valid => '200 1d';

spice wrap_jsonp_callback => 0; # only enable for non-JSONP APIs (i.e. no &callback= parameter)

# API endpoint - http://docs.duckduckhack.com/walkthroughs/forum-lookup.html#api-endpoint
spice to => 'https://api.coinmarketcap.com/v1/ticker/$1';

# Triggers - https://duck.co/duckduckhack/spice_triggers
triggers any => 'market cap', 'marketcap', 'volume';

# Handle statement
handle remainder => sub {

    my $table = LoadFile(share("coins.yml"));
    
    if(grep(/^$_$/i, values(%$table))) {
        return lc $_;
    }
    if(grep(/^$_$/i, keys(%$table))) {
        return lc $$table{lc $_};
    }

    return;
};

1;
