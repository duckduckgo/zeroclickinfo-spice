(function(env) {
    "use strict";
    env.ddg_spice_time = function(api) {

        if (!api || api.info == "No matches") {
            return Spice.failed('time');
        }

        var script = $('[src*="/js/spice/time/"]')[0],
            source = $(script).attr("src"),
            // Query is normalized as we'll normalize the generated strings.
            query = decodeURIComponent(source.match(/time\/([^\/]+)/)[1]).toLowerCase().split(' ').sort().join(' '),
            // This generates the strings form the location results and decides if they match
            combo_check = function(loc) {
                var hitit = false,
                    picks = 1, // Start with combinations of length 1
                    // The properities we want to use in our comparisons to check for matches.
                    props = [loc.geo.name, loc.geo.country.id, loc.geo.state, loc.geo.country.name].filter(function(v, i, a) {
                        return (typeof v === 'undefined') ? false : true;
                    }).map(function(v, i, a) {
                        return v.toLowerCase();
                    }), // Normalized down.
                    // Generic function for generating combinations from an array.
                    combos = function(choose, cb) {
                        var n = props.length;
                        var c = [];
                        var inner = function(start, choose_) {
                            if (choose_ == 0) {
                                cb(c);
                            } else {
                                for (var i = start; i <= n - choose_; ++i) {
                                    c.push(props[i]);
                                    inner(i + 1, choose_ - 1);
                                    c.pop();
                                }
                            }
                        }
                        inner(0, choose);
                    };
                // Get out ASAP once we find a hit.
                while (!hitit && picks++ <= props.length) {
                    combos(picks, function(c) {
                        // Normalize a string for the generated combination;
                        if (c.join(' ').split(' ').sort().join(' ') == query) {
                            hitit = true;
                        }
                    });;
                }
                return hitit;
            },
            index = 0,
            chosen;

        // Get out ASAP once we find a hit.
        while (!chosen && index++ < api.locations.length) {
            if (combo_check(api.locations[index])) {
                chosen = api.locations[index];
            }
        }
        if (typeof chosen === 'undefined') {
            chosen = api.locations[0]
        }

        var dateObj = DDG.getDateFromString(chosen.time.iso),
            months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'Jully', 'August', 'September', 'October', 'November', 'December'),
            days = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');

        //Convert 24 hour time to 12 hour time
        function toPrettyTime(date) {
            var hours = date.getHours(),
                minutes = date.getMinutes()
            return {
                hours: (hours % 12) || 12,
                minutes: minutes < 10 ? '0' + minutes : minutes,
                amPM: hours >= 12 ? "PM" : "AM"
            }
        }

        var dateTime = {
            time: toPrettyTime(dateObj),
            dayName: days[dateObj.getDay()],
            day: dateObj.getDate(),
            monthName: months[dateObj.getMonth()],
            year: dateObj.getFullYear(),
            placeName: chosen.geo.name,
            offset: chosen.time.timezone.offset.replace(/0|:/g, ""),
            zone: chosen.time.timezone.zonename,
            country: chosen.geo.country.name
        }

        Spice.add({
            id: "time",
            name: "Time",
            data: dateTime,
            meta: {
                sourceName: "timeanddate.com",
                sourceUrl: 'http://www.timeanddate.com/worldclock/city.html?n=' + chosen.id
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
