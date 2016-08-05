package DDG::Spice::Shares;
# ABSTRACT: Stock quote ticker

use strict;
use DDG::Spice;

triggers startend => 'stock quote for', 'stock quote', 'stock price of', 'stock price', 'share price', 'stocks', 'shares', 'share price for', 'share price of';

spice to => 'https://og6c1r82zb.execute-api.us-east-1.amazonaws.com/v1/ddg?term=$1';

spice wrap_jsonp_callback => 1;
spice proxy_cache_valid => "418 1d";

handle remainder => sub {
    # needs to be uppercase when it goes to charts api:
    return uc $_ if $_;
    return;
};

1;
