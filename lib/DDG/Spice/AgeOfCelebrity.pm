package DDG::Spice::AgeOfCelebrity;
# ABSTRACT: Attempts to parse the age of people with Wikipedia pages

use DDG::Spice;

# Caching - https://duck.co/duckduckhack/spice_advanced_backend#caching
spice is_cached => 1; 

# Metadata.  See https://duck.co/duckduckhack/metadata for help in filling out this section.
name "AgeOfCelebrity";
source "Wikipedia";
icon_url "http://en.wikipedia.org/favicon.ico";
description "Returns the age of people with Wikipedia pages";
primary_example_queries "how old is bill clinton", "how old is jimi hendrix";
secondary_example_queries "age of vanna white";
category "q/a";
topics "social", "trivia", "entertainment";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/AgeOfCelebrity.pm";
attribution github => ["davidcroda", "Dave Roda"];

# API endpoint - https://duck.co/duckduckhack/spice_attributes#spice-codetocode
spice to => 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts|info|pageimages&inprops=url&exintro=&explaintext=&titles=$1&continue=&redirects';

# Triggers - https://duck.co/duckduckhack/spice_triggers
triggers start => "how old is", "age of", "how old was";

spice wrap_jsonp_callback => 1;

# Handle statement
handle remainder => sub {

    return unless $_;    # Guard against "no answer"

    # Capitalize the first letter of each word (we are searching for names)
    $_ = join " ", map {ucfirst} split " ", $_;
    
    return $_;
};

1;
