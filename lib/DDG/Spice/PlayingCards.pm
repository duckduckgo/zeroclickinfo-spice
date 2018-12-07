package DDG::Spice::PlayingCards;
# ABSTRACT: Returns playing card

use strict;
use DDG::Spice;

triggers startend => 'deal', 'draw';

spice to => 'http://deckofcardsapi.com/api/deck/new/draw/?count=$1';
spice wrap_jsonp_callback => 1;
spice proxy_cache_valid => "418 1d";

handle remainder => sub {
    my $query = $_;
    
    if ($query && $query =~ m/^(\d{1,2})\s(?:random )?(?:playing )?(?:card(?:s)?)$/) {
        my $num = (split)[0];
        return $num if ($num >= 1 && $num <= 52);
    }

    return;
};

1;
