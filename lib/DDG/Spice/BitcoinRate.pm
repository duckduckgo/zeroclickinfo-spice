package DDG::Spice::BitcoinRate;
# ABSTRACT: Bitcoin exchange rates

use strict;
use utf8;
use DDG::Spice;

primary_example_queries "bitcoin";
secondary_example_queries "bitcoin eur", "bitcoin cny";
description "Get Bitcoin Exchange Rate";
name "BitcoinRate";
source "http://blockchain.info";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/BitcoinRate.pm";
topics "economy_and_finance";
category "conversions";

attribution github => ['https://github.com/jmg','Juan Manuel García'],
            email => ['jmg.utn@gmail.com','Juan Manuel García'];

spice to => 'https://blockchain.info/ticker';
spice wrap_jsonp_callback => 1;
spice proxy_cache_valid => "418 1d";

triggers start => "bitcoin exchange in", "bitcoin in", "btc to";
triggers startend => "bitcoin", "bit coin", "bitcoin exchange", "bit coin exchange", "bitcoin exchange rate", "bit coin exchange rate", "btc", "bitcoin price";

handle remainder => sub {
    return $_;
};

1;
