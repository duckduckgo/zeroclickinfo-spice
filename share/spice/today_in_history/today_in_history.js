(function (env) {
    "use strict";
    env.ddg_spice_today_in_history = function(api_result){

        if (api_result.error) {
            return Spice.failed('today_in_history');
        }

        var count = 0;

        for (var i in api_result.data.Events)
            count++;

        var rand = Math.floor(Math.random() * count);

        var year = api_result.data.Events[rand].year;
        var text = api_result.data.Events[rand].text;


        Spice.add({
            id: "today_in_history",
            name: "Today In History",
            data: {
                text: text,
                year: year
            },
            meta: {
                sourceName: "http://wikipedia.com/",
                sourceUrl: api_result.url
            },
            templates: {
                group: 'base',
                options: {
                    content: Spice.today_in_history.content,
                    moreAt: true
                }
            }
        });
    };
}(this));
