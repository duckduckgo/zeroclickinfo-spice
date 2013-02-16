package DDG::Spice::Bitcoin::Rates;

use DDG::Spice;

#triggers query_lc =>  "btc";
triggers any => "usd to btc", "btc to usd",  "aud to btc", "btc to aud",  "chf to btc", "btc to chf",  "nok to btc", "btc to nok",  "rub to btc", "btc to rub",  "cny to btc", "btc to cny",  "jpy to btc", "btc to jpy",  "thb to btc", "btc to thb",  "sgd to btc", "btc to sgd",  "gbp to btc", "btc to gbp",  "nzd to btc", "btc to nzd",  "pln to btc", "btc to pln",  "eur to btc", "btc to eur",  "sek to btc", "btc to sek",  "dkk to btc", "btc to dkk",  "hkd to btc", "btc to hkd",  "cad to btc", "btc to cad";

spice to => 'http://174.129.221.227/q?$1';
spice wrap_jsonp_callback => 1;

primary_example_queries "5.0234567 btc to usd";
secondary_example_queries "1.0 usd to btc";
description "add bitcoin to currency exchange";
name "BitcoinConvert";

icon_url "/i/174.129.221.227.ico";
source "MtGox";

spice proxy_cache_valid => "any 5m";

code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/BitcoinConvert.pm";
topics "economy_and_finance";
category "calculations";
attribution github => ['https://github.com/3pence','3pence'];

handle query_lc => sub {
    s/[' ']/-/g;
    return $_ unless $_ eq '';
    return;
};
1;
