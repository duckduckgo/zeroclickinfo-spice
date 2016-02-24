(function (env) {
    "use strict";
    env.ddg_spice_magic_the_gathering = function(api_result){
        console.log(api_result);
        
        if (!api_result || api_result.error) {
            return Spice.failed('magic_the_gathering');
        }

        // Render the response
        Spice.add({
            id: "magic_the_gathering",
            name: "Cards",
            data: api_result,
            meta: {
                sourceName: "deckbrew.com",
                sourceUrl: 'http://example.com/url/to/details/' + api_result.name
            },
            normalize: function(item) {
                var image_url = DDG.http(item.editions[0].image_url);
                return {
                    title: item.name,
                    subtitle: item.editions[0].flavor,
                    description: item.text,
                    url: item.editions[0].store_url,
                    image: image_url
                };
            },
            templates: {
                group: 'media',
                options: {
                    moreAt: true
                }
            }
        });
    };
}(this));
