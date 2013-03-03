package DDG::Spice::Bitcoin::Chart;

use DDG::Spice;

#triggers query_lc =>  "btc";
triggers any => "btc chart","charts btc", "chart btc", "bitcoin chart", "bitcoin charts";

spice to => 'https://s3-eu-west-1.amazonaws.com/btc.convert/charts.json';
spice wrap_jsonp_callback => 1;

primary_example_queries "5.0234567 btc to usd";
description "add bitcoin to currency exchange";
name "BitcoinConvert";

icon_url "/i/174.129.229.21.ico";
source "MtGox";

spice proxy_cache_valid => "any 5m";

code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Bitcoin/Chart.pm";
topics "economy_and_finance";
category "calculations";
attribution github => ['https://github.com/3pence','3pence'];

handle query_lc => sub {
    s/[' ']/-/g;
    return $_ unless $_ eq '';
    return;
};
1;
