(function (env) {
    "use strict";
    env.ddg_spice_time = function(api_result){

       if (!api_result) {
            return Spice.failed('time');
        }
        
       $.ajaxSetup({'cache':true});
       $.getScript("/share/spice/time/moment.min.js", function() {
          var ISOTime = api_result.locations[0].time.iso;
          var data = moment(ISOTime).zone(ISOTime); //phase the time and zone
           var timeData = {
            time: data,
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
        });

           
      
    };
}(this));
