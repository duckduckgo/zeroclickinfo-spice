package DDG::Spice::ISBN;
# ABSTRACT: Returns book details for a query ISBN.

use DDG::Spice;
use strict;
use warnings;

primary_example_queries     "isbn 0330287001", "ISBN number 0-06-250217-4";
secondary_example_queries   "0-330-2870 0-1  ISBN", "978 0 7432 4722 1 ISBN lookup";
name                        "ISBN";
description                 "Returns book details for a query ISBN";
source                      "http://amazon.com/";
code_url                    "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/ISBN.pm";
category                    "reference";
topics                      "everyday", "entertainment", "special_interest";
attribution github  =>      ["https://github.com/nishanths/", "Nishanth Shanmugham"],
            twitter =>      ["https://twitter.com/nshanmugham/", "Nishanth Shanmugham"],
            web     =>      ["http://nishanths.github.io/", "Nishanth Shanmugham"];

triggers startend   =>      'isbn', 'isbn number', 'isbn lookup';
spice to            =>      'https://bttf.duckduckgo.com/m.js?q=$1&cb={{callback}}';
spice is_cached     =>      1;

handle remainder => sub {
    $_ =~ s/[\s-]//g;                       # remove all whitespace and hyphens
    return $_ if (/^\d{10}$|^\d{13}$/);     # return only if number string of length 10 or 13
    return;
};

1;
