package DDG::Spice::Stocks;

use DDG::Spice;

primary_example_queries "AAPL";
description "Shows stock quote for a ticker";
name "Stocks";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Stocks.pm";
icon_url "/i/ycharts.com.ico";
topics "economy_and_finance";
category "finance";

# trigger is intentionally very specific, should trigger from internal view/deep triggers.
# It's only here because I couldn't get the /js/stocks/ location to end up in generated nginx conf
# unless I had at least some kind of trigger defined.
triggers start => 'stock quote';

spice to => 'http://ycharts.com/quotes/$1';
spice wrap_jsonp_callback => 1;
spice proxy_cache_valid => "418 1d";

handle remainder => sub {
    # needs to be uppercase when it goes to charts api:
    return uc $_ if $_;
    return;
};

1;
