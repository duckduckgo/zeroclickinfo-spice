package DDG::Spice::Book;

use DDG::Spice;

primary_example_queries "critic reviews moonwalking with einstein";
description "Shows critic reviews of a book from publications like NY Times, NPR, Guardian.";
name "iDreambooks";

spice to => 'http://idreambooks.com/newbooks/api.json?api_key=6ddd49633a8809eadb42a28f160bb25a1f24254d&q=$1';
#spice to => 'http://localhost:3000/newbooks/api.json?api_key=&q=$1';


triggers startend => "idreambooks", "book reviews", "book review";

spice wrap_jsonp_callback => 1;

spice is_cached => 1;

handle remainder => sub {
    return $_ if $_;
};

1;

