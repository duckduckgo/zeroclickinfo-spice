package DDG::Spice::Clojars;
# ABSTRACT: This spice searches for an artifact on Clojars.


use DDG::Spice;

spice is_cached => 1;

name "Clojars";
source "clojars.org";
icon_url "https://clojars.org/favicon.ico";
description "This spice accesses clojars.org, the clojure libraries reposisitory, to search for a clojure artifact";
primary_example_queries "clojure incanter", "clojars incanter","clojure cascalog incanter","clojure library incanter";
secondary_example_queries "";

category "programming";
topics "programming","computing";

code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Clojars.pm";

attribution github => ["turbopape", "Rafik Naccache"],
            twitter => "turbopape";


spice to => 'https://clojars.org/search?q=$1&format=json';
spice wrap_jsonp_callback => 1;


triggers startend => "clojure", "clojars","clojure lib", "clojure library","clojure package";

handle remainder => sub {

    return unless $_;

    $_ =~ s/\s+/"-"/g;    
    return $_;
};

1;
