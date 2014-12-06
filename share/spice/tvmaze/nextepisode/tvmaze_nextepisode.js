(function (env) {
    "use strict";

    env.ddg_spice_tvmaze_nextepisode = function(api_result){
        if (!api_result._embedded) {
            return Spice.failed('tvmaze');
        }

        Spice.add({
            id: "tvmaze",
            name: "TV Shows",
            data: api_result,
            meta: {
                sourceName: "TVmaze.com",
                sourceUrl: api_result._embedded.nextepisode.url
            },
            normalize: function(item){
                return {
                    image: item.image ? item.image.medium : null,
                    title: item.name
                };
            },
            templates: {
                group: 'info',
                options: {
                    content: Spice.tvmaze_nextepisode.content,
                    moreAt: true
                }
            }
        });
    };
}(this));
