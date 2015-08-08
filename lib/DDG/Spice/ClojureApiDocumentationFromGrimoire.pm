package DDG::Spice::ClojureApiDocumentationFromGrimoire;
# ABSTRACT: This Spice consults Grimoire (conj.io) source
# so it shows documentation about one Clojure Function.
# If no namespace is provided, it is defaulted to clojure.core
# Clojure version is 1.7 - the latest as of 8-8-2015

use DDG::Spice;

# Caching - https://duck.co/duckduckhack/spice_advanced_backend#caching-api-responses
spice is_cached => 1;

# Metadata.  See https://duck.co/duckduckhack/metadata for help in filling out this section.
name "ClojureApiDocumentationFromGrimoire";
source "conj.io";
icon_url "http://conj.io/public/favicon.ico";
description "Fetches documentation for namespace/symbol in Grimoire.";
primary_example_queries "clojure doseq", "clojure core.zip/rights" ;
# Uncomment and complete: https://duck.co/duckduckhack/metadata#category
category "programming";
# Uncomment and complete: https://duck.co/duckduckhack/metadata#topics
topics "programmaing","computing"
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/ClojureApiDocumentationFromGrimoire.pm";
attribution github => ["turbopape", "Rafik Naccache"],
            twitter => "turbopape";

# Triggers - https://duck.co/duckduckhack/spice_triggers
triggers any => 'clojure';

# API endpoint - https://duck.co/duckduckhack/spice_attributes#spice-codetocode

spice to => 'http://conj.io/api/v2/org.clojure/clojure/1.7.0/clj/$1?op=meta&callback={{callback}}';
spice wrap_jsonp_callback => 1;

# Handle statement
handle remainder => sub {

    # optional - regex guard
    # return unless qr/^\w+/;

    if ($_)
    {
     if ($_ =~ m/(\w|\d)+\/(\w|\d)+/)
        {return $_;}
     else
        {return "clojure.core/" .$_;}
     }
   
    return;
};

1;