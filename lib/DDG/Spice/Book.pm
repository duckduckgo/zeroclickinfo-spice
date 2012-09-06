package DDG::Spice::Book;

use DDG::Spice;

spice to => 'http://idreambooks.com/newbooks/api.json?api_key=duckduckgo&q=$1&callback={{callback}}';

triggers startend => "idreambooks","critic rating", "critic reviews";

handle remainder => sub {
    return $_;
};

1;