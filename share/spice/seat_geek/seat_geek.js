(function(env) {
    "use strict";
    env.ddg_spice_seat_geek = function(api_result) {

        if(api_result.error || !api_result || api_result.events.length === 0) {
            return Spice.failed('seat_geek');
        }

        var query = DDG.get_query();
        var clean_query = query.replace(/((upcoming\s)?(concerts?))|(live(\s(shows?))?)/, '').trim();

        var months = {
            '0': 'Jan',
            '1': 'Feb',
            '2': 'Mar',
            '3': 'Apr',
            '4': 'May',
            '5': 'June',
            '6': 'July',
            '7': 'Aug',
            '8': 'Sept',
            '9': 'Oct',
            '10': 'Nov',
            '11': 'Dec'
        };

        var days = {
            '0': 'Monday',
            '1': 'Tuesday',
            '2': 'Wednesday',
            '3': 'Thursday',
            '4': 'Friday',
            '5': 'Saturday',
            '6': 'Sunday'
        };

        Spice.add({
            id: "seat_geek",
            name: "Concerts",
            data: api_result.events,
            meta: {
                sourceName: "seatgeek.com",
                sourceUrl: "https://seatgeek.com/search?search=" + clean_query
            },
            normalize: function(item) {
                var artist = capitalize(clean_query);

                // Capitalize the name of the band/artist searched for;
                // if the name is composed by multiple words, capitalize
                // all of them
                function capitalize(string) {
                    var splitted = string.split(" ");
                    for(var i = 0; i < splitted.length; i++) {
                        var upper = splitted[i].substr(0, 1).toUpperCase();
                        var lower = splitted[i].substr(1, splitted[i].length).toLowerCase();
                        splitted[i] = upper + lower;
                    }

                    return splitted.join(" ");
                }

                function formatDate(date) {
                    date = new Date(date);
                    var week_day = days[date.getDay()];
                    var day = date.getDate();
                    var month = months[date.getMonth()];

                    return week_day + " " + month + " " + day;
                }

                // Get two performers (if available) other than
                // the one searched for
                function getPerformers(performers) {
                    var chosen = [];
                    var slug = clean_query.replace(/\s/g, "-");
                    for(var key in performers) {
                        if(chosen.length < 2 && performers[key].slug != slug) {
                            chosen.push({
                                'name': performers[key].name
                            });
                        } else if(chosen.length >= 2) {
                            break;
                        }
                    }

                    return chosen;
                }

                var a = {
                    link: item.url,
                    artist: artist,
                    performers: getPerformers(item.performers),
                    title: item.short_title,
                    place: item.venue.name,
                    city: item.venue.city + ", " + item.venue.country,
                    date: formatDate(item.datetime_local),
                    rating: item.score
                };
                return a;
            },
            templates: {
                group: 'text',
                options: {
                    content: Spice.seat_geek.content,
                    footer: Spice.seat_geek.footer,
                    moreAt: true
                }
            }
        });
    };
}(this));