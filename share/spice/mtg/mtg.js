(function (env) {
    "use strict";
    env.ddg_spice_mtg = function(api_result){

        if (api_result.error) {
            return Spice.failed('mtg');
        }


        var infoboxItems = {
            manaCost: "Mana Cost",
            convertedManaCost: "Converted Mana Cost",
            cardSetName: "Card Set Name",
            type: "Type",
            subType: "Sub Type",
            power: "Power",
            toughness: "Toughness",
            loyalty: "Loyalty",
            rarity: "Rarity",
            artist: "Artist",
            cardSetId: "Card Set Id",
            token: "Token",
            promo: "Promo"
        };

        var infoboxData = [{
            heading: 'Card Details',
        }];

        $.each(infoboxItems, function(key, value){
            if (api_result[0][key]){
                infoboxData.push({
                    label: value,
                    value: api_result[0][key]
                });
            }
        });

        Spice.add({
            id: "mtg",
            name: "Magic The Gathering",
            data: api_result[0],
            meta: {
                sourceUrl: "http://www.mtgdb.info/cards/" + api_result[0].id,
                sourceName: "M:tgDb"
            },
            normalize: function(item) {
                return {
                    title: item.name,
                    image:  "http://api.mtgdb.info/content/card_images/" + item.id + ".jpeg",
                    infoboxData: infoboxData
                };
            },
            templates: {
                group: 'info'
            }
        });
    };
}(this));
