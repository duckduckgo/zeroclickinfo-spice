(function(env) {
    "use strict";
    env.ddg_spice_seat_geek_events_by_city = function(api_result) {

        if(!api_result || api_result.error || api_result.events.length === 0) {
            return Spice.failed('seat_geek_events_by_city');
        }

        var query = DDG.get_query(),
            months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
            days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            events;

        // sometimes we get false positives from the SeatGeek API
        // where for example sports games get displayed instead of concerts
        //
        // filtering out events whose performers don't have genres
        // seems to be a way to guard against that
        events = $.grep(api_result.events, function (item) {
            if (item.performers && item.performers.length > 0) {
                for (var i = 0; i < item.performers.length; i++) {
                    if (item.performers[i].genres) {
                        return true;
                    }
                }
            }

            return false;
        });

        if (events.length === 0) {
            return Spice.failed('seat_geek_events_by_city');
        }

        Spice.add({
            id: "seat_geek_events_by_city",
            name: "Concerts",
            data: events,
            meta: {
                sourceName: "SeatGeek",
                sourceUrl: "https://seatgeek.com/search?search=" + query,
                sourceIconUrl: "https://seatgeek.com/favicon.ico",
                itemType: "Upcoming Concerts"
            },
            normalize: function(item) {
                var artistName = item.performers[0].short_name,
                    artistDisplayName = capitalizedAcronym(artistName);

                // Capitalize the name of the band/artist searched for;
                // if the name is composed by multiple words, capitalize
                // all of them; if the name is too long, return the acronym

                function capitalizedAcronym(string) {
                    var splitted = string.split(" "),
                        i,
                        acronym,
                        upper;

                    if(string.length < 18) {
                        for(i = 0; i < splitted.length; i++) {
                            splitted[i] = DDG.capitalize(splitted[i]);
                        }

                        return splitted.join(" ");
                    } else {
                        acronym = '';
                        for(i = 0; i < splitted.length; i++) {
                            upper = splitted[i].substr(0, 1).toUpperCase() + '.';
                            acronym += upper;
                        }

                        return acronym;
                    }
                }

                function getDate(date) {
                    if(date) {
                        // IE 8 and Safari don't support the yyyy-mm-dd date format,
                        // but they support mm/dd/yyyy
                        date = date.replace(/T.*/, '');
                        var remix_date = date.split("-");
                        date = remix_date[1] + "/" + remix_date[2] + "/" + remix_date[0];

                        date = new Date(date);
                        return date;
                    }

                    return;
                }

                function getMonth(date) {
                    if(date) {
                        var month = months[parseInt(date.getMonth())];
                        return month.toUpperCase();
                    }

                    return;
                }

                function getDay(date) {
                    if(date) {
                        var day = date.getDate();
                        return day;
                    }

                    return;
                }

                // Get number of performers, excluding
                // the one searched for

                function getNumPerformers(performers) {
                    var how_many = 0,
                        slug = artistName.toLowerCase().replace(/\s/g, "-"),
                        i;

                    for(i = 0; i < performers.length; i++) {
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
                        price = "$" + lowest + "+";
                    }

                    return price;
                }

                return {
                    url: item.url,
                    price: getPrice(item.stats.lowest_price, item.stats.highest_price),
                    artist: artistDisplayName,
                    num_performers: getNumPerformers(item.performers),
                    title: item.short_title,
                    place: item.venue.name,
                    img: item.performers[0].images.small,
                    city: item.venue.display_location,
                    month: getMonth(getDate(item.datetime_local)),
                    day: getDay(getDate(item.datetime_local))
                };
            },
            templates: {
                group: 'products',
                item: Spice.seat_geek_events_by_city.item,
                detail: false,
                item_detail: false,
                options: {
                    moreAt: true,
                    rating: false
                }
            }
        });
    };
}(this));
