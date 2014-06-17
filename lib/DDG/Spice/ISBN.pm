package DDG::Spice::ISBN;
# ABSTRACT: Returns book details for a query ISBN

use DDG::Spice;

primary_example_queries "isbn 0330287001", "isbn number 0-06-250217-4";
secondary_example_queries "0-330-2870 0-1  ISBN", "978 0 7432 4722 1 isbn number";
description "Returns book details for a query ISBN";
name "ISBN Search";
source "https://openlibrary.org/";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/ISBN.pm";
category "reference";
topics "everyday", "entertainment", "special_interest";
attribution github => ["https://github.com/nishanths", "Nishanth Shanmugham"],
            twitter => ["https://twitter.com/nshanmugham", "Nishanth Shanmugham"],
            web => ["http://nishanths.github.io", "Nishanth Shanmugham"];

triggers startend => 'isbn', 'isbn number';
spice to => 'https://openlibrary.org/api/books?bibkeys=ISBN:$1&callback={{callback}}&format=javascript&jscmd=data';

handle remainder => sub {
    $_ =~ s/\s//g; # remove all whitespace
    $_ =~ s/-//g; # remove '-'

    return $_ if (/^\d{9}$|^\d{10}$|^\d{13}$/); # only number strings of length 9 or 10 or 13
    return;
};

1;
