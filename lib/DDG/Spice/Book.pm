package DDG::Spice::Book;
# ABSTRACT: Book reviews

use strict;
use DDG::Spice;

spice to => 'http://idreambooks.com/api/books/reviews.json?api_key={{ENV{DDG_SPICE_BOOK_APIKEY}}}&bpq=10&q=$1';

triggers startend => "idreambooks", "book reviews", "book review";

spice wrap_jsonp_callback => 1;
spice is_cached => 1;

handle remainder => sub {
    return $_ if $_;
    return;
};

1;

