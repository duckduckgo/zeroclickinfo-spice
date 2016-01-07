package DDG::Spice::Clojars;
# ABSTRACT: This spice searches for an artifact on Clojars.


use DDG::Spice;

spice is_cached => 1;

spice to => 'https://clojars.org/search?q=$1&format=json';
spice wrap_jsonp_callback => 1;


triggers startend => "clojure", "clojars","clojure lib", "clojure library","clojure package";

handle remainder => sub {

    return unless $_;

    $_ =~ s/\s+/"-"/g;    
    return $_;
};

1;
