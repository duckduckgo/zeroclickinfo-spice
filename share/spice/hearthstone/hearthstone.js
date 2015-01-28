(function (env) {
    "use strict";
    env.ddg_spice_hearthstone = function(api_result){

        // Validate the response
        if (!api_result || api_result.error || !api_result.Has_name || !api_result.page) {
            return Spice.failed('hearthstone');
        }
        
        // Card Data
        // May (but very unlikely) return <undefined> values for : image_url, Has_card_type, Has_rarity,
        // Has_class, Has_mana_cost
        var card = {
            page: api_result.page,
            image: api_result.image_url,
            name: api_result.Has_name,
            type: api_result.Has_card_type,
            rarity: api_result.Has_rarity,
            hero: api_result.Has_class,
            cost: api_result.Has_mana_cost,
            attack: api_result.Has_attack, // <undefined> for cards other than minions
            health: api_result.Has_health, // <undefined> for cards other than minions
            description: api_result.Has_description, // may be <undefined>
            flavor: api_result.Has_flavor_text // may be <undefined>
        };
        
        // Don't forget to add {{#if attack}} ... {{/if}} conditionnals in view template
        
        // Card Hero
        if(card.hero === "Any") {
            card.hero = "Any Hero";
        }
        
        
        // Render the response
        Spice.add({
            id: "hearthstone",
            name: "Hearthstone",
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
