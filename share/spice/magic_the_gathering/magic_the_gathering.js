(function (env) {
    "use strict";
    env.ddg_spice_magic_the_gathering = function(api_result){
        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error) {
            return Spice.failed('magic_the_gathering');
        }

        // Render the response
        Spice.add({
            id: "magic_the_gathering",
            name: "Games",
            data: api_result,
            meta: {
                itemType: "Cards",
                sourceName: "Deckbrew.com",
                sourceUrl: "http://deckbrew.com/api/",
                count: api_result.length,
                snippetChars: 120
            },
            normalize: function(item) {
                if (item.name === DDG.get_query()){
                    item.exactMatch = true;

                }
                var card_image = DDG.toHTTP(item.editions[0].image_url);
                var infoboxData = [
                    { heading: "Card Details" },
                    { label: "Types", value: item.types },
                    { label: "Subtypes", value: item.subtypes },
                    { label: "Colors", value: item.colors },
                    { label: "CMC", value: item.cmc },
                    { label: "Cost", value: item.cost },
                    { label: "Power", value: item.power },
                    { label: "Toughness", value: item.toughness }
                ];
                return {
                    title: item.name,
                    description: item.text ? item.text : "No description",
                    types: item.types,
                    altSubtitle: item.subtypes ? item.subtypes : " ",
                    url: item.editions[0].store_url,
                    rarity: item.power ? item.power + "/" + item.toughness : null,
                    image: card_image,
                    infoboxData: infoboxData
                };
            },
            templates: {
                group: "media",
                options: {
                    footer: Spice.magic_the_gathering.footer,
                    content: Spice.magic_the_gathering.content,
                    aux: true,
                    moreAt: true
                },
                variants: {
                    tileSnippet: "large",
                    tileTitle: "1line-large"
                },
                elClass: {
                    tileFoot: "tx-clr--grey-light"
                }
            }
        });
    };
}(this));
