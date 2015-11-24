(function (env) {
    "use strict";
    env.ddg_spice_playing_cards = function(api_result){
        if(api_result.error || !api_result.cards) {
            return Spice.failed('playing_cards');
        }

        Spice.add({
            id: "playing_cards",
            name: "Answer",
            data: api_result.cards,
            meta: {
                sourceName: "DeckOfCards",
                sourceUrl: 'http://deckofcardsapi.com',
                primaryText: 'Showing ' + api_result.cards.length + ' Cards'
            },
            normalize: function(item) {
                return {
                    image: item.image,
                    img: item.image
                };
            },
            templates: {
                group: 'movies',
                detail: false,
                item_detail: false
            }
        });
     }
  }
(this));
