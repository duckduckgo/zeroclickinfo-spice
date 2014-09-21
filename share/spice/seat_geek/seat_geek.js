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
            '0': 'Sunday',
            '1': 'Monday',
            '2': 'Tuesday',
            '3': 'Wednesday',
            '4': 'Thursday',
            '5': 'Friday',
            '6': 'Saturday'
        };

        Spice.add({
            id: "seat_geek",
            name: "Concerts",
            data: api_result.events,
            meta: {
                sourceName: "SeatGeek",
                sourceUrl: "https://seatgeek.com/search?search=" + clean_query,
                sourceIconUrl: "https://seatgeek.com/favicon.ico"
            },
            normalize: function(item) {
                var artist = capitalizedAcronym(clean_query);

                // Capitalize the name of the band/artist searched for;
                // if the name is composed by multiple words, capitalize
                // all of them; if the name is too long, return the acronym
                function capitalizedAcronym(string) {
                    var splitted = string.split(" ");
                    if(string.length < 18) {
                        for(var i = 0; i < splitted.length; i++) {
                            splitted[i] = DDG.capitalize(splitted[i]);
                        }

                        return splitted.join(" ");
                    } else {
                        var acronym = '';
                        for (var i = 0; i < splitted.length; i++) {
                            var upper = splitted[i].substr(0, 1).toUpperCase() + '.';
                            acronym += upper;
                        }

                        return acronym;
                    }
                }

                function formatDate(date) {
                    // IE 8 and Safari don't support the yyyy-mm-dd date format,
                    // but they support mm/dd/yyyy
                    date = date.replace(/T.*/, '');
                    var remix_date = date.split("-");
                    date = remix_date[1] + "/" + remix_date[2] + "/" + remix_date[0];

                    date = new Date(date);
                    var week_day = days[date.getDay()];
                    var day = date.getDate();
                    var month = months[date.getMonth()];

                    return week_day + " " + month + " " + day;
                }

                // Get max two performers (if available) other than
                // the one searched for
                function getPerformers(performers) {
                    var chosen = [artist];
                    var slug = clean_query.replace(/\s/g, "-");
                    for(var i = 0; i < performers.length; i++) {
                        if(chosen.length < 3 && performers[i].slug !== slug) {
                            chosen.push(performers[i].name);
                        } else if(chosen.length >= 3) {
                            break;
                        }
                    }

                    return chosen;
                }

                var a = {
                    url: item.url,
                    price: item.stats.lowest_price? "$" + item.stats.lowest_price : "",
                    artist: artist,
                    performers: getPerformers(item.performers),
                    heading: item.short_title,
                    title: item.short_title,
                    place: item.venue.name,
                    img: item.performers[0].images.small,
                    city: item.venue.city + ", " + item.venue.country,
                    date: formatDate(item.datetime_local),
                    rating: item.score
                };
                return a;
            },
            templates: {
                group: 'products',
                item: Spice.seat_geek.item,
                options: {
                    subtitle_content: Spice.seat_geek.content,
                    buy: Spice.seat_geek.buy,
                    moreAt: true,
                    rating: false
                }
            }
        });
    };
}(this));