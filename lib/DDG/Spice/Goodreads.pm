package DDG::Spice::Goodreads;

use strict;
use DDG::Spice;
use URI::Escape;
use Data::Dump qw(dump);

# Caching
spice is_cached => 1;

# Goodreads API endpoint
my $api_key = '{{ENV{DDG_SPICE_GOODREADS_APIKEY}}}';
my $book_search_endpoint = uri_escape('https://www.goodreads.com/search/index.xml?key=') . $api_key . uri_escape('&search[field]=') . '$1' . uri_escape('&q=') . '$2';

spice to => 'https://duckduckgo.com/x.js?u=' . $book_search_endpoint;
spice wrap_jsonp_callback => 1;

# Alternative end points to fetch book description and image.
spice alt_to => {
  get_book_details => {
    to => 'https://duckduckgo.com/x.js?u=' . uri_escape("https://www.goodreads.com/book/show/") . '$1' . uri_escape("?format=xml&key=") . $api_key,
    wrap_jsonp_callback => 1
  },
  
  get_image_for_book => {
    is_cached => 1,
    proxy_cache_valid => '200 30d',
    to => 'https://duckduckgo.com/m.js?q=$1'
  }
};

spice from => '([^-]+)-([^-]+)';

# Triggers
triggers start => (
    # author
    "books by", "book by", "books of", "book of",
    "books written by", "book written by", "books authored by", "book authored by",
    "list of books by", "list of books written by", "list of books authored by",
    
    # personality/topics
    "books on", "book on", "books about", "book about",
    "books written on", "book written on", "books written about", "book written about",
    "list of books on", "list of books written on"
);

# Handle statement
handle remainder => sub {
    return unless qr{^\w+};
    
    my $search_type = $req->query_nowhitespace =~ /books?(written)?(on|about)/i ? "title" : "authors";
    return "$search_type-$_" if $_;

    return;
};

1;
