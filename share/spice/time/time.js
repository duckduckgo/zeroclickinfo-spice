(function(env) {
    "use strict";
    env.ddg_spice_time = function(api) {

        if (!api || api.info == "No matches") {
            return Spice.failed('time');
        }
        
         var script = $('[src*="/js/spice/time/"]')[0],
             source = $(script).attr("src"),
             query = decodeURIComponent(source.match(/time\/([^\/]+)/)[1]).toLowerCase();
        
         var locID = 0;
         var locArr = [];
        
        if(api.locations.length > 1) {
            for (var i = 0, len = api.locations.length; i < len; i++) {
                //Match geo.name only
                if(api.locations[i].geo.name.toLowerCase() == query) {
                    locArr.push(i);
                }
                //Match geo.name + geo.country.id
                if(api.locations[i].geo.name.toLowerCase() + " " + api.locations[i].geo.country.id == query) {
                    locArr.push(i);
                }
                //Match geo.name + geo.country.name
                if(api.locations[i].geo.state) {
                if(api.locations[i].geo.name.toLowerCase() + " " + api.locations[i].geo.state.toLowerCase() == query) {
                    locArr.push(i);
                }
                }
                //Match geo.name + geo.state 
                if(api.locations[i].geo.name.toLowerCase() + " " + api.locations[i].geo.country.name.toLowerCase() == query) {
                    locArr.push(i);
                }
            }
            //Assign first (most relevant) location ID.
             locID = locArr[0] ? locArr[0] : 0
        }
        
        var dateObj = DDG.getDateFromString(api.locations[locID].time.iso),
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
            placeName: api.locations[locID].geo.name,
            offset: api.locations[locID].time.timezone.offset.replace(/0|:/g, ""),
            zone: api.locations[locID].time.timezone.zonename,
            country: api.locations[locID].geo.country.name
        }

        Spice.add({
            id: "time",
            name: "Time",
            data: dateTime,
            meta: {
                sourceName: "timeanddate.com",
                sourceUrl: 'http://www.timeanddate.com/worldclock/city.html?n=' + api.locations[locID].id
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