package DDG::Spice::Book;

use DDG::Spice;

spice to => 'http://localhost:3000/newbooks/api.json?api_key=duckduckgo&q=$1&callback={{callback}}';

triggers startend => "readometer","book", "books", "book review", "book reviews","critics","critic","critic rating","critic reviews", "review", "reviews", "idreambooks", "rating";

handle remainder => sub {
    return $_;
};

1;