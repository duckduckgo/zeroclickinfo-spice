package DDG::Spice::UrbanDictionary;
# ABSTRACT: Give the Urban Dictionary definition of the search query.

use strict;
use DDG::Spice;

spice is_unsafe => 1;

triggers startend => "ud", "urban", "urbandictionary", "urban dictionary";

spice to => 'http://api.urbandictionary.com/v0/define?term=$1&callback={{callback}}';

handle remainder => sub {
    my ($term) = @_;
    return $term if $term;
    return;
};

1;
