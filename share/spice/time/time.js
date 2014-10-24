(function (env) {
    "use strict";
    env.ddg_spice_time = function(api_result){

       if (!api_result || !api_result.locations.length) {
            return Spice.failed('time');
        }
        
    var timeString = DDG.getDateFromString(api_result.locations[0].time.iso),
        day = timeString.getDay(),
        month = timeString.getMonth(),
        year = timeString.getFullYear(),         
        months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'Jully', 'August', 'September', 'October', 'November', 'December'),
        days = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
        
       var dateTime = {
           time: timeString.toLocaleTimeString().replace(/:\d+ /, ' '),
           dayName: days[day],
           day: day,
           monthName: months[month],
           year: year,
           offset: api_result.locations[0].time.timezone.offset.replace(/0|:/g, ""),
           placeName: api_result.locations[0].geo.name,
           country: api_result.locations[0].geo.country.name
        }
        
        Spice.add({
            id: "time",
            name: "Time",
            data:  dateTime,
            meta: {
                sourceName: "timeanddate.com",
                sourceUrl: 'http://timeanddate.com' 
            },
            templates: {
                group: 'base',
                options: {
                    content: Spice.time.content,
                    moreAt: true
                }
                }        
            
        });      
    };
}(this));
