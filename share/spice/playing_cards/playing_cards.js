(function (env) {
    "use strict";
    env.ddg_spice_playing_cards = function(api_result){
        if(api_result.error || !api_result.cards) {
            return Spice.failed('playing_cards');
        }
        
        Spice.add({
            id: "playing_cards",
            name: "Deck of Cards",
            data: api_result.cards,
            meta: {
                sourceName: "DeckOfCards",
                sourceUrl: 'http://deckofcardsapi.com'
            },
            templates: {
                group: 'movies',
                variants: {
                    tile: 'poster'
                },
                options: {
                    content: Spice.playing_cards.content,
                    moreAt: true,
                    rating: false
                }
            }
        });
     }
  }
(this));