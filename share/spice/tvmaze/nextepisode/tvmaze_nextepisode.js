(function (env) {
    "use strict";

    env.ddg_spice_tvmaze_nextepisode = function(api_result){
        if (!api_result || !api_result._embedded) {
            return Spice.failed('tvmaze_nextepisode');
        }

        Spice.add({
            id: "tvmaze_nextepisode",
            name: "Entertainment",
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

    Handlebars.registerHelper("tvmaze_dateformat", function (date) {
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var dateObj = new Date(date);

        return months[dateObj.getMonth()] + " " + dateObj.getDate() + ", " + dateObj.getFullYear();
    });
}(this));
