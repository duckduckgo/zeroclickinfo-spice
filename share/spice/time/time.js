(function (env) {
    "use strict";
    env.ddg_spice_time = function(api_result){

       if (!api_result) {
            return Spice.failed('time');
        }
        
        var timeData = {
            isoTime = api_result.locations[0].time.iso,
            place = api_result.locations[0].geo.name
        }
        
        Spice.add({
            id: "Time",
            name: "Time",
            data:  api_result,
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
