package DDG::Spice::Book;

use DDG::Spice;

primary_example_queries "book reviews moonwalking with einstein";
description "Shows critic rating and a sample review of a book from publications like NY Times, NPR, Guardian.";
name "iDreambooks";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Book.pm";
category "reference";
topics "entertainment", "everyday";

spice to => 'http://idreambooks.com/api/books/reviews.json?api_key={{ENV{DDG_SPICE_BOOK_APIKEY}}}&bpq=10&q=$1';

triggers startend => "idreambooks", "book reviews", "book review";

spice wrap_jsonp_callback => 1;
spice is_cached => 1;

handle remainder => sub {
    return $_ if $_;
    return;
};

1;

