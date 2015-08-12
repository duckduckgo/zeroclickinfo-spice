package DDG::Spice::Clojars;
# ABSTRACT: This spide searches for an artifact on Clojars.


use DDG::Spice;

# Caching - https://duck.co/duckduckhack/spice_advanced_backend#caching-api-responses
spice is_cached => 1;

# Metadata.  See https://duck.co/duckduckhack/metadata for help in filling out this section.
name "Clojars";
source "clojars.org";
icon_url "https://clojars.org/favicon.ico";
description "This spice accesses clojars.org, the clojure libraries reposisitory, to search for a clojure artifact";
primary_example_queries "clojure some-lib", "clojars some-lib","clojure lib some-lib","clojure library some-lib";
secondary_example_queries "";

category "programming";

topics "programming","computing";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/ClojurePackagesFromClojars.pm";
attribution github => ["turbopape", "Rafik Naccache"],
            twitter => "turbopape";


spice to => 'https://clojars.org/search?q=$1&format=json&callback={{callback}}';
spice wrap_jsonp_callback => 1;


triggers any => "clojure", "clojars","clojure lib", "clojure library";

# Handle statement
handle remainder => sub {

    # optional - regex guard
    # return unless qr/^\w+/;

    return unless $_;    # Guard against "no answer"

    return $_;
};

1;
