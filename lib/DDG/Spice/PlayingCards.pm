package DDG::Spice::PlayingCards;
# ABSTRACT: Returns playing card

use strict;
use DDG::Spice;

name "PlayingCards";
source "http://deckofcardsapi.com";
category "random";
topics "words_and_games";
description "Deals the user a random set of n cards";

code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/PlayingCards.pm";

primary_example_queries "deal 7 cards";
secondary_example_queries "deal 3", "deal 23";

attribution web     => ['https://kbhat95.github.io', 'Kishor Bhat'],
            github  => ["kbhat95", "Kishor Bhat"];



triggers startend => 'deal', 'draw';

spice to => 'http://deckofcardsapi.com/api/deck/new/draw/?count=$1';
spice wrap_jsonp_callback => 1;
spice proxy_cache_valid => "418 1d";

handle remainder => sub {
    my $query = $_;
    
    if ($query && $query =~ m/(\d{1,2})(?:random )?(?:(?:playing )? cards)?/) {
        my $num = (split)[0];
        return $num if ($num >= 1 && $num <= 52);
    }
    
    return;
};

1;