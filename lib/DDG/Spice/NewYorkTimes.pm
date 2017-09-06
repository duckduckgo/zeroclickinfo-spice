package DDG::Spice::NewYorkTimes;
# ABSTRACT: Details on New York Times best sellers

use strict;
use DDG::Spice;

spice to => 'https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?api-key={{ENV{DDG_SPICE_NYTIMES_BOOKS_APIKEY}}}&title=$1';

triggers startend => "new york times", "new york times best seller";


spice wrap_jsonp_callback => 1;
spice is_cached => 1;



handle remainder => sub {
    return $_ if $_;
    return;
};

1;