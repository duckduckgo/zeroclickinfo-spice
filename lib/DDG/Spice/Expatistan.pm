package DDG::Spice::Expatistan;

use DDG::Spice;

triggers query_lc => qr/cost of living/;

spice to => 'http://www.expatistan.com/api/spice?q=$1&api_key={{ENV{DDG_SPICE_EXPATISTAN_APIKEY}}}';

handle query_lc => sub {
    return $_;
};

1;
