package DDG::Spice::BiblioSearch::GetBookDetails;

use strict;
use DDG::Spice;
use URI::Escape;

triggers any => '///***never_trigger***///';

my $api_key = '{{ENV{DDG_SPICE_BIBLIOSEARCH_GODREADS_APIKEY}}}';
# my $api_search_endpoint = uri_escape("https://www.goodreads.com/book/isbn?format=xml&key=") . $api_key . uri_escape("&isbn=") . '$1';
my $api_search_endpoint = uri_escape("https://www.goodreads.com/book/show/") . '$1' . uri_escape("?format=xml&key=") . $api_key;

spice to => 'https://duckduckgo.com/x.js?u=' . $api_search_endpoint;

spice is_cached => 1;
spice proxy_cache_valid => "200 30d";

handle query_lc => sub {
    return $_ if $_;
    return;
};
1;
