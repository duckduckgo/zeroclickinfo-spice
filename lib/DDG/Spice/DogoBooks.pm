package DDG::Spice::DogoBooks;

use DDG::Spice;

triggers startend => "dogobooks", "dogo books", "dogo";
triggers start => "kids", "kid", "child", "children";
triggers end => "books";

spice to => 'http://api.dogomedia.com/api/v2/books/search.json?query=$1&api_key={{ENV{DDG_SPICE_DOGO_APIKEY}}}';
spice wrap_jsonp_callback => 1;

handle query_lc => sub {
    
    return $_ if $_ =~ /book/i;
    return;
};

1;
