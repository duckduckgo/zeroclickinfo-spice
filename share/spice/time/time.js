(function(env) {
    "use strict";
    env.ddg_spice_time = function(api_result) {

        if (!api_result || !api_result.locations.length) {
            return Spice.failed('time');
        }

        var dateStr = DDG.getDateFromString(api_result.locations[0].time.iso),
            months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'Jully', 'August', 'September', 'October', 'November', 'December'),
            days = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');

        //Convert 24 hour returned by getHours to 12 hour value
        var get12Hour = function(hours) {
            return {
                "amPM_hours": (hours % 12) || 12,
                "amPM": hours >= 12 ? "PM" : "AM"
            };
        };
        
        //Add leading to getMinutes value
        function pad(n){return n<10 ? '0'+n : n}

        var dateTime = {
            time: {
                hours: get12Hour(dateStr.getHours()).amPM_hours,
                minutes: pad(dateStr.getMinutes()),
                amPM: get12Hour(dateStr.getHours()).amPM
            },
            dayName: days[dateStr.getDay()],
            day: dateStr.getDate(),
            monthName: months[dateStr.getMonth()],
            year: dateStr.getFullYear(),
            placeName: api_result.locations[0].geo.name,
            offset: api_result.locations[0].time.timezone.offset.replace(/0|:/g, ""),
            zone: api_result.locations[0].time.timezone.zonename,
            country: api_result.locations[0].geo.country.name
        }

        Spice.add({
            id: "time",
            name: "Time",
            data: dateTime,
            meta: {
                sourceName: "timeanddate.com",
                sourceUrl: 'http://www.timeanddate.com/worldclock/city.html?n=' + api_result.locations[0].id
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