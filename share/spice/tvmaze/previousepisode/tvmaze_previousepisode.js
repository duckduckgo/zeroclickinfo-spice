(function (env) {
    "use strict";

    env.ddg_spice_tvmaze_previousepisode = function(api_result){
        if (!api_result || !api_result._embedded) {
            return Spice.failed('tvmaze_previousepisode');
        }

        Spice.add({
            id: "tvmaze_previousepisode",
            name: "Entertainment",
            data: api_result,
            meta: {
                sourceName: "TVmaze.com",
                sourceUrl: api_result._embedded.previousepisode.url
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
                    content: Spice.tvmaze_previousepisode.content,
                    moreAt: true
                }
            }
        });
    };

    Handlebars.registerHelper("tvmaze_dateformat", function (date) {
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var dateObj = new Date(date);

        return months[dateObj.getMonth()] + " " + dateObj.getDate() + ", " + dateObj.getFullYear();
    });
}(this));
