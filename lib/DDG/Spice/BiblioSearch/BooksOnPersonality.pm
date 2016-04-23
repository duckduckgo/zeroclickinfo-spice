package DDG::Spice::BiblioSearch::BooksOnPersonality;
# ABSTRACT: This module fetches books authored by a person searched for in DDG.

use strict;
use DDG::Spice;
use URI::Escape;

# Caching - https://duck.co/duckduckhack/spice_advanced_backend#caching-api-responses
spice is_cached => 1;

# Metadata.  See https://duck.co/duckduckhack/metadata for help in filling out this section.
name "BiblioSearch - Books On Personality";
source "Goodreads";
icon_url "https://www.goodreads.com/images/icons/goodreads_icon_32x32.png";
description "Displays a list of books written about a certain person/topic. This might include books written by the same person.";
primary_example_queries "Books on Kurt Cobain, Books about Tata";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/BiblioSearch/BooksOnPersonality.pm";
attribution github => ["iammrigank", "Mriganka Ghosh"],
            twitter => "tweetmrigank";

# API endpoint
my $api_key = '{{ENV{DDG_SPICE_BIBLIOSEARCH_GODREADS_APIKEY}}}';
my $api_search_endpoint = uri_escape("https://www.goodreads.com/search/index.xml?key=") . $api_key . uri_escape("&search[field]=title&q=") . '$1';

spice to => 'https://duckduckgo.com/x.js?u=' . $api_search_endpoint;
spice wrap_jsonp_callback => 1;

# my $trigger_regex = qr{^(list )?(of )?book(s)? (about|on)?};

# Triggers - https://duck.co/duckduckhack/spice_triggers
triggers startend => (
    "books on",
    "book on",
    "books about",
    "book about",
    "books written by on",
    "book written by on",
    "books authored on",
    "book authored on",
    "list of books on",
    "list of books written on"
);
  
# Handle statement
handle query_lc => sub {

    # optional - regex guard
    return unless qr/^\w+/;
    return unless $_;
    
    return $_;
};

1;