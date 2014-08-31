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

my @currencies = ("usd", "jpy", "cny", "sgd", "hkd", "cad", "nzd", "aud", "clp", "gbp", "dkk",
    "sek", "isk", "chf", "brl", "eur", "rub", "pln", "thb", "krw", "twd");

triggers start => "bitcoin exchange in";
triggers any => "to btc", "btc to", "in btc", "btc in", "bitcoin in", "in bitcoin";
triggers startend => "bitcoin", "bit coin", "bitcoin exchange", "bit coin exchange", "bitcoin exchange rate", "bit coin exchange rate", "btc", "bitcoin price";

handle remainder => sub {
    my $query = $_;
    my $currency = "usd"; #default to usd
    for my $curr (@currencies) {
        if (index($query, $curr) > -1){
            $currency = $curr;
            last;
        }
    }
    $query =~ /([\d\.]+)/;
    return ($currency, $1);
};

1;
