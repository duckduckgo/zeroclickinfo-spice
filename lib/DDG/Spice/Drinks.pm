package DDG::Spice::Drinks;
# ABSTRACT: Drink mixing instructions

use strict;
use DDG::Spice;
use Text::Trim;

spice is_cached => 1;

spice to => 'http://www.thecocktaildb.com/api/json/v1/{{ENV{DDG_SPICE_COCKTAILDB_APIKEY}}}/search.php?s=$1';
spice wrap_jsonp_callback => 1;

triggers any => ('cocktail', 'drink', 'ingredient', 'ingredients', 'make', 'making', 'mix', 'mixing', 'recipe');

my %drinks = map { trim($_) => 0 } share('drinks.txt')->slurp;
my @stop_words = ("are", "being", "for", "how", "is", "needed", "that", "to", "used", "what", "within");
my ($rx) = map qr/(?:$_)/, join "|", map qr/\b\Q$_\E\b/, @stop_words;

# Handle statement
handle remainder_lc => sub {
    $_ =~ s/$rx//g;
    $_ =~ s/\b(a|an|in|of)\b//;
    trim $_;
    if (exists ($drinks{$_})) {
        return $_;
    }
    return;
};

1;
