package DDG::Spice::Expatistan;

use DDG::Spice;

triggers query_lc => qr/cost of living/;

spice to => 'https://s3-eu-west-1.amazonaws.com/btc.convert/data.json?q={{data}}';

primary_example_queries "5.023 btc to usd";
description "add bitcoin to currency exchange";
name "BitcoinConverter";
icon_url "/i/www.expatistan.com.ico";
source "Expatisan";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Expatistan.pm";
topics "economy_and_finance";
category "facts";
attribution github => ['https://github.com/hunterlang','Hunter Lang'];

handle query_lc => sub {
    return $_ if defined $_;
};

1;
