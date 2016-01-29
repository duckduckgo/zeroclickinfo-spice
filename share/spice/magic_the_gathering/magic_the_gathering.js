(function (env) {
    "use strict";
    env.ddg_spice_magic_the_gathering = function(api_result){
        console.log(api_result);
        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error) {
            return Spice.failed('magic_the_gathering');
        }

        // Render the response
        Spice.add({
            id: "magic_the_gathering",
            name: "Magic: The Gathering",
            data: api_result,
            meta: {
                itemType: "Cards",
                sourceName: "Deckbrew.com",
                sourceUrl: "http://deckbrew.com/api/",
                count: api_result.length,
            },
            normalize: function(item) {
                var card_image = DDG.toHTTP(item.editions[0].image_url);
                return {
                    title: item.name,
                    description: item.text,
                    subtitle: item.editions[0].flavor,
                    url: item.store_url,
                    image: card_image
                };
            },
            templates: {
                group: 'info',
                options: {
                    moreAt: true
                }
            }
        });
    };
}(this));
