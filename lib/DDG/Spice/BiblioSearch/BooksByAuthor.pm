package DDG::Spice::BiblioSearch::BooksByAuthor;
# ABSTRACT: This module fetches books authored by a person searched for in DDG.

use strict;
use DDG::Spice;
use URI::Escape;

# Caching - https://duck.co/duckduckhack/spice_advanced_backend#caching-api-responses
spice is_cached => 1;

# Metadata.  See https://duck.co/duckduckhack/metadata for help in filling out this section.
name "BiblioSearch - Books By Author";
source "Goodreads";
icon_url "https://www.goodreads.com/images/icons/goodreads_icon_32x32.png";
description "Displays a list of books written/co-writen/edited by certain author.";
primary_example_queries "Books by Arundhati Roy, Books authored by Shakespeare";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/BiblioSearch/BooksByAuthor.pm";
attribution github => ["iammrigank", "Mriganka Ghosh"],
            twitter => "tweetmrigank";

# Goodreads API endpoint
my $api_key = '{{ENV{DDG_SPICE_BIBLIOSEARCH_GODREADS_APIKEY}}}';
my $api_search_endpoint = uri_escape("https://www.goodreads.com/search/index.xml?key=") . $api_key . uri_escape("&search[field]=authors&q=") . '$1';

spice to => 'https://duckduckgo.com/x.js?u=' . $api_search_endpoint;
spice wrap_jsonp_callback => 1;

# Triggers - https://duck.co/duckduckhack/spice_triggers
# my $trigger_regex = qr{^(list )?(of )?book(s)? (authored |written )?(of|by)?};

triggers startend => (
    "books by",
    "book by",
    "books of",
    "book of",
    "books written by",
    "book written by",
    "books authored by",
    "book authored by",
    "list of books by",
    "list of books written by",
    "list of books authored by"
);

# Handle statement
handle remainder_lc => sub {
    return unless qr{^\w+};

    return $_ if $_;
    return;
};

1;
