(function (env) {
    "use strict";
    env.ddg_spice_seat_geek = function(api_result){

        if (api_result.error || !api_result || api_result.events.length === 0) {
            return Spice.failed('seat_geek');
        }

        var query = DDG.get_query();
        var clean_query = query.replace(/((upcoming\s)?((concert)|(concerts)))|(live(\s(show)|(shows))?)/, '').trim();

        Spice.add({
            id: "seat_geek",
            name: "Concerts",
            data: api_result.events,
            meta: {
                sourceName: "seatgeek.com",
                sourceUrl: "https://seatgeek.com/search?search=" + clean_query
                //sourceUrl: api_result.events[0].performers[0].url
            },
            normalize: function(item) {
                var a = {
                    image: item.performers[0].image,
                    link: item.url,
                    title: item.short_title,
                    rating: item.score
                };
                return a;
            },
            templates: {
                group: 'info',
                options:{
                    content: Spice.seat_geek.content,
                    moreAt: true
                }
            }
        });
    };
}(this));