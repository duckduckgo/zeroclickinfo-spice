package DDG::Spice::Isbn;

use DDG::Spice;

triggers any => "isbn";

spice to => 'http://isbndb.com/api/books.xml?access_key=3XTYI2X5&index1=isbn&value1=$1';

handle query_lc => sub {
    if ($_ =~ /^(?:isbn )?(\d{10})(?: isbn)?/) {
    #if ($_ =~ /^(?:isbn )?(\d{10}\d{3}?)(?: isbn)?/) {
        if ($1) {
            return $1;
        } else {
            return '';
        }
    }
    return;
};

1;
