(function (env) {
    "use strict";
    env.ddg_spice_hearthstone = function(api_result){

        // Validate the response
        if (!api_result || api_result.error || !api_result.Has_name) {
            return Spice.failed('hearthstone');
        }
        
        // Card Data
        var card = {
            page: api_result.page,
            image: api_result.image_url,
            name: api_result.Has_name,
            type: api_result.Has_card_type,
            rarity: api_result.Has_rarity,
            hero: api_result.Has_class,
            cost: api_result.Has_mana_cost,
            attack: api_result.Has_attack,
            health: api_result.Has_health,
            description: api_result.Has_description,
            flavor: api_result.Has_flavor_text
        };
        
        // Card Hero
        if(card.hero === "Any") {
            card.hero = "Any Hero";
        }
        
        
        // Render the response
        Spice.add({
            id: "hearthstone",
            name: "Card",
            data: card,
            meta: {
                sourceName: "Hearthstone Gamepedia Wiki",
                sourceUrl: "http://hearthstone.gamepedia.com/" + card.page
            },
            templates: {
                group: 'base',
                options: {
                    content: Spice.hearthstone.hearthstone,
                    moreAt: true
                }
            }
        });
    };
}(this));
