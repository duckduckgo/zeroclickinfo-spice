package DDG::Spice::Expatistan;

use DDG::Spice;

triggers query_lc => qr/cost of living/;

spice to => 'http://www.expatistan.com/api/spice?q=$1&api_key={{ENV{DDG_SPICE_EXPATISTAN_APIKEY}}}';

primary_example_queries "cost of living in Philadelphia";
description "See and compare costs of living via Expatistan";
name "Expatisan";
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
