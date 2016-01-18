package DDG::Spice::BoardGameGeek;
# ABSTRACT: Get information on a board game from the BoardGameGeek API

use DDG::Spice;

spice is_cached => 1;
spice proxy_cache_valid => "200 7d";

spice wrap_jsonp_callback => 1;

spice to => 'http://www.boardgamegeek.com/xmlapi2/search?query=$1';

triggers end => 'boardgame', 'board game', 'card game';

handle remainder => sub {
    return unless $_;
    return $_;
};

1;
