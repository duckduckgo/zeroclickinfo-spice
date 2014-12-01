(function(env) {
    "use strict";
    env.ddg_spice_seat_geek_sports = function(api_result) {

        if(!api_result || api_result.error || api_result.events.length === 0) {
            return Spice.failed('seat_geek_sports');
        }

        var query = DDG.get_query();
        var clean_query = query.replace(/((upcoming\s)?(match(es)?))|(events?)|(schedule)|(sports)/, '').trim().toLowerCase();

        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        Spice.add({
            id: "seat_geek_sports",
            name: "Sports",
            data: api_result.events,
            meta: {
                sourceName: "SeatGeek",
                sourceUrl: "https://seatgeek.com/search?search=" + clean_query,
                sourceIconUrl: "https://seatgeek.com/favicon.ico",
                itemType: "upcoming events"
            },
            normalize: function(item) {
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

                function getYear(date) {
                    if(date) {
                        var year = date.getFullYear();
                        return year;
                    }

                    return;
                }

                function getMonth(date) {
                    if(date) {
                        var month = months[parseInt(date.getMonth())];
                        return month;
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

                function getPrice(lowest, highest) {
                    var price = "";

                    if(lowest && highest) {
                        price = "$" + lowest + " - $" + highest;
                    }

                    return price;
                }

                // Find the performer queried for,
                // or return the first of the list if it's not
                // specified in the query
                function getPerformer(performers) {
                    var performer = performers[0];
                    if(performers.length === 1) {
                        return performer;
                    } else {
                        for(var i = 0; i < performers.length; i++) {
                            if(performers[i].name === clean_query || performers[i].short_name === clean_query) {
                                return performers[i];
                            }
                        }

                        return performer;
                    }
                }

                var performer = getPerformer(item.performers);

                return {
                    url: item.url,
                    price: getPrice(item.stats.lowest_price, item.stats.highest_price),
                    title: performer.name,
                    place: item.venue.name,
                    img: performer.image,
                    city: "@ " + item.venue.city + ", " + item.venue.country,
                    month: getMonth(getDate(item.datetime_local)),
                    day: getDay(getDate(item.datetime_local)),
                    year: getYear(getDate(item.datetime_local))
                };
            },
            templates: {
                group: 'products',
                item: Spice.seat_geek_sports.item,
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
