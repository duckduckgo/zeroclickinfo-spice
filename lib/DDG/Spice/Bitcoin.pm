package DDG::Spice::Bitcoin;
# ABSTRACT: Bitcoin exchange rates

use strict;
use utf8;
use DDG::Spice;

spice to => 'https://blockchain.info/ticker';
spice wrap_jsonp_callback => 1;
spice proxy_cache_valid => "418 1d";

triggers start => "bitcoin exchange in", "bitcoin in", "btc to";
triggers startend => "bitcoin", "bit coin", "bitcoin exchange", "bit coin exchange", "bitcoin exchange rate", "bit coin exchange rate", "btc", "bitcoin price";

handle remainder => sub {
    return $_;
};

1;
