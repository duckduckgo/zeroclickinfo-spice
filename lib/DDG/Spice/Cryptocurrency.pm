package DDG::Spice::Cryptocurrency;

use utf8;
use DDG::Spice;

spice to => 'http://coinmarketcap.northpole.ro/api/v5/all.json';
spice wrap_jsonp_callback => 1;

triggers start => "crypto", "crypto test";
#triggers startend => "bitcoin", "bit coin", "bitcoin exchange", "bit coin exchange", "bitcoin exchange rate", "bit coin exchange rate", "btc", "bitcoin price";

handle remainder => sub {
    return $_;
};

1;
