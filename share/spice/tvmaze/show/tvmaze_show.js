(function (env) {
    "use strict";
    
    env.ddg_spice_tvmaze_show = function(api_result){
        if (!api_result.id) {
            return Spice.failed('tvmaze');
        }

        Spice.add({
            id: "tvmaze",
            name: "TV Shows",
            data: api_result,
            meta: {
                sourceName: "TVmaze.com",
                sourceUrl: api_result.url
            },
			normalize: function(item){
				return {
					image: item.image ? item.image.medium : null,
					title: item.name,
					description: DDG.strip_html(item.summary),
				};
			},
            templates: {
                group: 'info',
                options: {
                    aux: Spice.tvmaze_show.infobox,
                    moreAt: true,
                }
            },
        });
    };
}(this));
