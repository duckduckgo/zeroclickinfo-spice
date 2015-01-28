(function (env) {
    "use strict";
    env.ddg_spice_hearthstone = function(api_result){

        // Validate the response
        if (!api_result || api_result.error || !api_result.Has_name || !api_result.page) {
            return Spice.failed('hearthstone');
        }
        
        // Infobox Labels
        var infoboxItems = {
            Has_card_type: "Type",
            Has_class: "Playable by",
            Has_rarity: "Rarity",
            Is_part_of_set: "Set",
            Is_collectible: "Collectible"
        };
        
        // Render the response
        Spice.add({
            id: "hearthstone",
            name: "Hearthstone",
            data: api_result,
            meta: {
                sourceName: "Hearthstone Gamepedia Wiki",
                sourceUrl: "http://hearthstone.gamepedia.com/" + api_result.page
            },
            normalize: function(item) {
                
                // Infobox Heading
                var infoboxData = [{
                    heading: 'Card Details'
                }];
                
                // Is collectible
                api_result.Is_collectible = (api_result.Is_collectible ? "Yes":"No");
                
                // Hero
                if(api_result.Has_class === "Any") {
                    api_result.Has_class = "Any Hero";
                }
                
                // InfoBox data
                $.each(infoboxItems, function(key, value){
                    if (api_result[key]){
                        infoboxData.push({
                            label: value,
                            value: api_result[key]
                        });
                    }
                });
                
                // Normalized data
                var card = {
                    title: item.Has_name,
                    url: "http://hearthstone.gamepedia.com/" + item.page,
                    image: item.image_url,
                    infoboxData: infoboxData,
                    cost: item.Has_mana_cost
                };
                
                // Optionnal fields
                
                // Attack
                if(item.Has_attack) {
                    card.attack = item.Has_attack;
                }
                
                // Health
                if(item.Has_health) {
                    card.health = item.Has_health;
                }
                
                // Description
                if(item.Has_description) {
                    card.card_description = item.Has_description;
                }
                
                // Flavor text
                if(item.Has_flavor_text) {
                    card.flavor = item.Has_flavor_text;
                }
                
                return card;
            },
            templates: {
                group: 'info',
                options: {
                    content: Spice.hearthstone.hearthstone
                }
            }
        });
    };
}(this));
