package DDG::Spice::MagicTheGathering;

# ABSTRACT: Search for Magic The Gathering card details

use strict;
use DDG::Spice;

spice is_cached => 1;
spice proxy_cache_valid => "200 1w";

spice wrap_jsonp_callback => 1;

spice to => 'https://api.scryfall.com/cards/search?q=$1';

triggers startend => 'magic card', 'mtg', 'magic: the gathering', 'magic the gathering';

handle remainder => sub {
    s/cards?//;
    return unless $_;
    return $_;
};

1;
