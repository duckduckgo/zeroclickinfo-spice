(function(env) {
    "use strict";
    env.ddg_spice_seat_geek = function(api_result) {

        if(api_result.error || !api_result || api_result.events.length === 0) {
            return Spice.failed('seat_geek');
        }

        var query = DDG.get_query();
        var clean_query = query.replace(/((upcoming\s)?(concerts?))|(live(\s(shows?))?)/, '').trim().toLowerCase();

        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

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
                        for(var i = 0; i < splitted.length; i++) {
                            var upper = splitted[i].substr(0, 1).toUpperCase() + '.';
                            acronym += upper;
                        }

                        return acronym;
                    }
                }

                function getDate(date) {
                    // IE 8 and Safari don't support the yyyy-mm-dd date format,
                    // but they support mm/dd/yyyy
                    date = date.replace(/T.*/, '');
                    var remix_date = date.split("-");
                    date = remix_date[1] + "/" + remix_date[2] + "/" + remix_date[0];

                    date = new Date(date);
                    return date;
                }

                function getMonth(date) {
                    var month = months[parseInt(date.getMonth())];
                    return month.toUpperCase();
                }

                function getDay(date) {
                    var day = date.getDate();
                    return day;
                }

                // Get number of performers, excluding
                // the one searched for

                function getNumPerformers(performers) {
                    var how_many = 0;
                    var slug = clean_query.replace(/\s/g, "-");
                    for(var i = 0; i < performers.length; i++) {
                        if(performers[i].slug !== slug) {
                            how_many++;
                        }
                    }

                    if(how_many > 1) {
                        return how_many;
                    }

                    return;
                }

                function getPrice(lowest, highest) {
                    var price = "";

                    if(lowest && highest) {
                        price = "$" + lowest + " - $" + highest;
                    }

                    return price;
                }

                var a = {
                    url: item.url,
                    price: getPrice(item.stats.lowest_price, item.stats.highest_price),
                    artist: artist,
                    num_performers: getNumPerformers(item.performers),
                    title: item.short_title,
                    place: item.venue.name,
                    img: item.performers[0].images.small,
                    city: item.venue.city + ", " + item.venue.country,
                    month: getMonth(getDate(item.datetime_local)),
                    day: getDay(getDate(item.datetime_local))
                };
                return a;
            },
            templates: {
                group: 'products',
                item: Spice.seat_geek.item,
                options: {
                    moreAt: true,
                    rating: false
                }
            }
        });
    };
}(this));