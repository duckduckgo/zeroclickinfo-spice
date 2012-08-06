package DDG::Spice::Book;

use DDG::Spice;

spice to => 'http://127.0.0.1:3000/newbooks/api.json?q=$1&callback={{callback}}';


triggers startend => "readometer","book", "book review", "book reviews","critics","critic rating","critic reviews", "review", "reviews", "idreambooks", "rating";

handle remainder => sub {
    return $_;
};

1;