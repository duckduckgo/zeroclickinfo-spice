package DDG::Spice::Bitcoin;

use DDG::Spice;

primary_example_queries "bitcoin";
secondary_example_queries "bitcoin eur", "bitcoin cny";
description "Get Bitcoin Exchange Rate";
name "Bitcoin";
source "http://blockchain.info";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Bitcoin.pm";
topics "economy_and_finance";
category "conversions";

attribution github => ['https://github.com/jmg','Juan Manuel García'],
            email => ['jmg.utn@gmail.com','Juan Manuel García'];

spice to => 'http://blockchain.info/ticker';
spice wrap_jsonp_callback => 1;
spice proxy_cache_valid => "418 1d";

triggers start => "bitcoin exchange in";
triggers startend => "bitcoin", "bit coin", "bitcoin exchange", "bit coin exchange";

handle remainder => sub {    

    return $_;
};

1;