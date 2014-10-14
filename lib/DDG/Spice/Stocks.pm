package DDG::Spice::Stocks;

use DDG::Spice;

primary_example_queries "AAPL";
description "Shows stock quote for a ticker";
name "Stocks";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Stocks.pm";
icon_url "/i/ycharts.com.ico";
topics "economy_and_finance";
category "finance";
triggers startend => 'stock';

spice to => 'http://ycharts.com/quotes/$1';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
    # needs to be uppercase when it goes to charts api:
    return uc $_ if $_;
    return;
};

1;
