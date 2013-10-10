package DDG::Spice::Book;

use DDG::Spice;

primary_example_queries "book reviews moonwalking with einstein";
description "Shows critic rating and a sample review of a book from publications like NY Times, NPR, Guardian.";
name "iDreambooks";

spice to => 'http://idreambooks.com/newbooks/api.json?api_key={{ENV{DDG_SPICE_BOOK_APIKEY}}}&q=$1';

triggers startend => "idreambooks", "book reviews", "book review";

spice wrap_jsonp_callback => 1;

spice is_cached => 0;

handle remainder => sub {
    return $_ if $_;
};

1;

