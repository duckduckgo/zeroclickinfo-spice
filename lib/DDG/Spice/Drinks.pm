package DDG::Spice::Drinks;
# ABSTRACT: Drink mixing instructions

use strict;
use DDG::Spice;

spice is_cached => 1;

name "Drinks";
description "Bartending info";
primary_example_queries "how to mix a mojito";
secondary_example_queries "mixing 007", "how to make a 1.21 gigawatts";

code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Drinks.pm";
attribution github  => ["https://github.com/mutilator", "mutilator"],
            github  => ["https://github.com/ozdemirburak", "Burak Özdemir"],
            twitter => ["https://twitter.com/ozdemirbur", "Burak Özdemir"],
            web     => ["http://burakozdemir.co.uk", "Burak Özdemir"];

spice to => 'http://www.thecocktaildb.com/api/json/v1/1/search.php?s=$1';
spice wrap_jsonp_callback => 1;

triggers any => "mix", "make";
triggers startend => "drink", "ingredients", "mixing", "making";

# Handle statement
handle query_lc => sub {

    my $drink;

    # enforce "drink" to be in queries with
    # "make" or "making"
    # too ambiguous otherwise
    # e.g. "making a rails 4 backend"
    if (/^(?:how to make|making) an? (.+)/) {
        $drink = $1;
        return unless $drink =~ /\bdrink\b/;
    } elsif (/^(?:how to mix|mixing) an? (.+)/) {
        $drink = $1;
    } elsif (/^ingredients for an? (.+)|(.+) ingredients/) {
        $drink = $1||$2;
    } elsif (/^(.+) drink$|^drink (.+)$/) {
        $drink = $1;
    }

    if ($drink) {
        $drink =~ s/drink//g;
        $drink =~ s/^\s+|\s+$//g;
        return $drink;
    }
    return;
};

1;
