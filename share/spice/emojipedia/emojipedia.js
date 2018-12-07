(function (env) {
    "use strict";
    env.ddg_spice_emojipedia = function(api_result){

        if (!api_result || api_result.error) {
            return Spice.failed('emojipedia');
        }

        Spice.add({
            id: "emojipedia",
            name: "Emojipedia",
            data: api_result,
            meta: {
                sourceName: "Emojipedia",
                sourceUrl: 'http://emojipedia.org/' + api_result.emoji
            },
            normalize: function(item) {
                return {
                    emoji: item.emoji,
                    title: item.name,
                    description: item.description,
                    image: item.image,
                    url: item.permalink
                };
            },
            templates: {
                group: 'info',
//                 options: {
//                     content: Spice.emojipedia.content
//                 }
            }
        });
    };
}(this));
