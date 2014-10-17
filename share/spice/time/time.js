(function (env) {
    "use strict";
    env.ddg_spice_time = function(api_result){

       if (!api_result) {
            return Spice.failed('time');
        }
        
        nrj("share/spice/time/moment.min.js");

        var timeData = {
            time: moment().format("dddd, MMMM Do YYYY, h:mm:ss a"),
            date: final_date,
            place: api_result.locations[0].geo.name + ", " + api_result.locations[0].geo.country.name
        }
        
        Spice.add({
            id: "time",
            name: "Time",
            data:  timeData,
            meta: {
                sourceName: "Example.com",
                sourceUrl: 'http://example.com' 
            },
            templates: {
                group: 'text',
                options: {
                    content: Spice.time.content,
                    moreAt: true
                }
            }
        });
    };
}(this));
