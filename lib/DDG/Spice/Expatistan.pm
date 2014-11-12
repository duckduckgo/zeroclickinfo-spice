package DDG::Spice::Expatistan;

use DDG::Spice;

primary_example_queries "cost of living in Philadelphia";
secondary_example_queries "cost of living barcelona vs madrid";
description "See and compare costs of living via Expatistan";
name "Expatisan";
icon_url "/i/www.expatistan.com.ico";
source "Expatisan";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Expatistan.pm";
topics "economy_and_finance";
category "facts";
attribution github => ['https://github.com/hunterlang','Hunter Lang'];

triggers any => "cost of living";

spice to => 'http://www.expatistan.com/api/spice?q=$1&api_key={{ENV{DDG_SPICE_EXPATISTAN_APIKEY}}}';

handle query_lc => sub {
    return $_ if $_;
    return;
};

1;
