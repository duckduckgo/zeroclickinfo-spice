(function(env) {
    "use strict";
    
    env.ddg_spice_hearthstone = function(api_result) {
        
        // Validate the response
        if(!api_result || api_result.error || !api_result.Has_name || !api_result.page) {
            return Spice.failed('hearthstone');
        }
        
        // Infobox Labels
        var infoboxItems = {
            Has_card_type: "Type",
            Has_class: "Playable by",
            Has_mana_cost: {
                label: "Cost",
                icon: "http://hydra-media.cursecdn.com/hearthstone.gamepedia.com/8/8b/Mana_icon.png"
            },
            Has_attack: {
                label: "Attack",
                icon: "http://hydra-media.cursecdn.com/hearthstone.gamepedia.com/f/fe/Attack_icon.png"
            },
            Has_health: {
                label: "Health",
                icon: "http://hydra-media.cursecdn.com/hearthstone.gamepedia.com/1/17/Health_icon.png"
            },
            Has_rarity: "Rarity",
            Is_part_of_set: "Set",
            Is_collectible: "Collectible"
        };
        
        // Render the response
        Spice.add({
            id: "hearthstone",
            name: "Gaming",
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
                api_result.Is_collectible = (api_result.Is_collectible === "t" ? "Yes" : "No");
                
                // Hero
                if(api_result.Has_class === "Any") {
                    api_result.Has_class = "Any Hero";
                }
                
                // InfoBox data
                $.each(infoboxItems, function(key, data) {
                    var label,
                        value;
                    if(api_result[key]) {
                        value = api_result[key];
                        if(data.label) {
                            label = data.label;
                        } else {
                            label = data;
                        }
                        infoboxData.push({
                            label: label,
                            value: value
                        });
                    }
                });
                
                // Normalized data
                var card = {
                    title: item.Has_name,
                    url: "http://hearthstone.gamepedia.com/" + item.page,
                    infoboxData: infoboxData
                };
                
                // Optionnal fields
                // Image
                if(item.image_url) {
                    card.image = item.image_url;
                }
                
                // Description
                if(item.Has_description) {
                    card.card_description = item.Has_description;
                }
                
                // Flavor text
                if(item.Has_flavor_text) {
                    card.subtitle = item.Has_flavor_text;
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
