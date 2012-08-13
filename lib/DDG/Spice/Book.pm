package DDG::Spice::Book;

use DDG::Spice;

spice to => 'http://idreambooks.com/newbooks/api.json?api_key=duckduckgo&q=$1&callback={{callback}}';

triggers startend => "readometer","book", "books", "book review", "book reviews","critics","critic","critic rating","critic reviews", "review", "reviews", "idreambooks", "rating";

handle remainder => sub {
    return $_;
};

1;