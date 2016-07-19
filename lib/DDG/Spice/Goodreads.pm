package DDG::Spice::Goodreads;

use strict;
use DDG::Spice;
use URI::Escape;
use Text::Trim;

# Caching
spice is_cached => 1;

# Goodreads API endpoint
my $api_key = '{{ENV{DDG_SPICE_GOODREADS_APIKEY}}}';
my $book_search_endpoint =
    uri_escape('https://www.goodreads.com/search/index.xml?key=')
  . $api_key
  . uri_escape('&search[field]=') . '$1'
  . uri_escape('&q=') . '$2';

spice to => 'https://duckduckgo.com/x.js?u=' . $book_search_endpoint;
spice wrap_jsonp_callback => 1;

# Alternative end points to fetch book description and image.
spice alt_to => {
    goodreads_book_details => {
        to => 'https://duckduckgo.com/x.js?u='
          . uri_escape("https://www.goodreads.com/book/show/") . '$1'
          . uri_escape("?format=xml&key=")
          . $api_key
    },

    goodreads_book_image => {
        is_cached         => 1,
        proxy_cache_valid => '200 30d',
        to                => 'https://duckduckgo.com/m.js?q=$1'
    }
};

spice from => '([^-]+)-([^-]+)';

# Triggers
triggers startend => "goodreads", "gr";

my $book_pattern = qr/(list )?(of )?books? ?(written )?(on|by|about) /i;
my $goodreads_pattern = qr/(goodreads|gr)/i;

# Handle statement
handle query_clean => sub {
    return unless $_ =~ $book_pattern;
    
    my $search_type =
          $_ =~ /by/i
          ? "authors"
          : "title";
    $_ =~ s/$book_pattern//g;       # removing the book query pattern from query
    $_ =~ s/$goodreads_pattern//g;  # removing the goodreads trigger pattern from query
    $_ = trim($_);                  # trim spaces from queries
    return "$search_type-$_" if $_;

    return;
};
1;