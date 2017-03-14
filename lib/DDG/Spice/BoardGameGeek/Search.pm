package DDG::Spice::BoardGameGeek::Search;
# ABSTRACT: Get information on a board game from the BoardGameGeek API

use DDG::Spice;

spice is_cached => 1;
spice proxy_cache_valid => "200 7d";

spice wrap_jsonp_callback => 1;

# Need to escape string passed to &u= param, except $1
my $search_url = uri_esc("http://www.boardgamegeek.com/xmlapi2/search?type=boardgame&query=");
my $detail_url = uri_esc("http://www.boardgamegeek.com/xmlapi2/thing?stats=1&id=");

spice to => 'https://duckduckgo.com/x.js?u=' . $search_url . '$1';

spice alt_to => {
    get_details => {
        to => 'https://duckduckgo.com/x.js?u=' . $detail_url . '$1',
        is_cached => 1,
        proxy_cache_valid => "200 14d"
    }
};

triggers end => 'boardgamegeek', 'board game geek', 'boardgame', 'board game', 'card game';

handle remainder => sub {
    return unless $_;
    return $_;
};

1;
