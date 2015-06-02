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
                sourceUrl: 'http://deckofcardsapi.com',
                itemType: 'Cards'
            },
            normalize: function(item) {
                return {
                    image: item.image,
                    img: item.image
                };
            },
            templates: {
                group: 'media',
                detail: false,
                item_detail: false
            }
        });
     }
  }
(this));