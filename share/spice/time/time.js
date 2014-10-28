(function(env) {
    "use strict";
    env.ddg_spice_time = function(api_result) {

        if (!api_result || api_result.info == "No matches") {
            return Spice.failed('time');
        }
        
         var script = $('[src*="/js/spice/time/"]')[0],
            source = $(script).attr("src"),
            query = decodeURIComponent(source.match(/time\/([^\/]+)/)[1]).toLowerCase();
        
         var locID = 0;
         var locArr = [];
        
        //Check if we have more then one location  
        if(api_result.locations.length > 1) {
            for (var i = 0, len = api_result.locations.length; i < len; i++) {
                //Match exact geo.name
                if(api_result.locations[i].geo.name.toLowerCase() == query) {
                    locArr.push(i);
                }
            }
            //Assign first (most relevant) location ID.
             locID = locArr[0];
        }

        var dateObj = DDG.getDateFromString(api_result.locations[locID].time.iso),
            months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'Jully', 'August', 'September', 'October', 'November', 'December'),
            days = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');

        //Convert 24 hour time to 12 hour time
        function toPrettyTime(date) {
          var hours = date.getHours(),
              minutes = date.getMinutes()
          return { 
            hours: (hours % 12) || 12,
            minutes: minutes<10 ? '0'+minutes : minutes,
            amPM: hours >= 12 ? "PM" : "AM"
        }
        }

        var dateTime = {
            time: toPrettyTime(dateObj),
            dayName: days[dateObj.getDay()],
            day: dateObj.getDate(),
            monthName: months[dateObj.getMonth()],
            year: dateObj.getFullYear(),
            placeName: api_result.locations[locID].geo.name,
            offset: api_result.locations[locID].time.timezone.offset.replace(/0|:/g, ""),
            zone: api_result.locations[locID].time.timezone.zonename,
            country: api_result.locations[locID].geo.country.name
        }

        Spice.add({
            id: "time",
            name: "Time",
            data: dateTime,
            meta: {
                sourceName: "timeanddate.com",
                sourceUrl: 'http://www.timeanddate.com/worldclock/city.html?n=' + api_result.locations[locID].id
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