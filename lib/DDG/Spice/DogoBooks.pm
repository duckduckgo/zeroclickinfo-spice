package DDG::Spice::DogoBooks;

use DDG::Spice;

primary_example_queries "kids books";
secondary_example_queries "smile kids book", "hunger games kids book reviews", "harry potter book kids review";
description "Search the DOGObooks database for kids book reviews and ratings";
name "DOGObooks";
code_url "https://github.com/dogomedia/zeroclickinfo-spice/blob/master/lib/DDG/Spice/DogoBooks.pm";
topics "entertainment", "everyday";
category "entertainment";
attribution github => ['https://github.com/dogomedia','DOGO Media'];

my @triggers = ( 
"dogobooks", 
"dogo books", 

"children's book", 
"children's book review", 
"children's book reviews", 
"children's books", 

"kids book",
"kids book review",
"kids book reviews", 
"kids books",

"book for children", 
"book for kids", 
"book kids review", 
"book kids reviews", 
"book review for kids", 
"book review for children", 
"book reviews for kids", 
"book reviews for children", 

"books for children", 
"books for kids", 

"book rating", 
"book ratings",

"book review", 
"book reviews"
);
triggers startend => @triggers;

spice to => 'http://api.dogomedia.com/api/v2/books/search.json?query=$1&api_key={{ENV{DDG_SPICE_DOGO_BOOKS_APIKEY}}}';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
    return $_ if $_;
    return "popular";
};

1;
