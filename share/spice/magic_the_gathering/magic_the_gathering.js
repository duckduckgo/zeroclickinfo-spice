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
            name: "Cards",
            data: api_result,
            meta: {
                itemType: "Cards",
                sourceName: "Deckbrew.com",
                sourceUrl: "http://deckbrew.com/api/",
                count: api_result.length,
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
                    { label: "Colors", value: item.colors }
                ];
                return {
                    title: item.name,
                    description: item.text,
                    subtitle: item.editions[0].flavor,
                    url: item.store_url,
                    image: card_image,
                    infoboxData: infoboxData
                };
            },
            templates: {
                group: 'info',
                options: {
                    rating: false,
                    aux: true,
                    moreAt: true
                }
            }
        });
    };
}(this));
