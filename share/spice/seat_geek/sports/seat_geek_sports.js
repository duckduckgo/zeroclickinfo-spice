(function(env) {
    "use strict";
    env.ddg_spice_seat_geek_sports = function(api_result) {

        if(!api_result || api_result.error || api_result.events.length === 0) {
            return Spice.failed('seat_geek_sports');
        }

        var query = DDG.get_query();
        var clean_query = $.trim(query.replace(/((upcoming\s)?(match(es)?))|(events?)|(schedule)|(sports)/, '').toLowerCase());

        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

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
                        return DDG.getOrdinal(day);
                    }

                    return;
                }

                // Return a logo for this performer if available
                function getLogo(performer, taxonomies) {
                    performer = performer.toLowerCase().replace("vs. ", "").replace(/\s/g, "_");
                    for(var i = 0; i < taxonomies.length; i++) {
                        if(taxonomies[i].name === "mlb" || taxonomies[i].name === "nba" || taxonomies[i].name === "nfl" || taxonomies[i].name === "nhl") {
                            return DDG.get_asset_path('seat_geek/sports', 'assets/' + taxonomies[i].name + '/' + performer.replace("vs. ", "") + '.gif ');
                        }
                    }

                    return '';
                }

                function getPrice(lowest, highest) {
                    var price = "";

                    if(lowest && highest) {
                        price = "$" + lowest + " - $" + highest;
                    }

                    return price;
                }

                // Find the performer queried for,
                // or return the first of the list
                // if not specified in the query
                function getPerformer(performers) {
                    var performer = performers[0];
                    if(performers.length === 1) {
                        return performer;
                    } else {
                        for(var i = 0; i < performers.length; i++) {
                            // If available, return the opponent team/performer
                            if(performers[i].name.toLowerCase() !== clean_query && performers[i].short_name.toLowerCase() !== clean_query) {
                                performers[i].name = "vs. " + performers[i].name;
                                return performers[i];
                            }
                        }

                        return performer;
                    }
                }

                var performer = getPerformer(item.performers);

                return {
                    url: item.url,
                    price: "$" + item.stats.lowest_price + "+",
                    title: performer.name,
                    place: "@ " + item.venue.name,
                    logo: getLogo(performer.name, item.taxonomies),
                    city: item.venue.city + ", " + item.venue.country,
                    month: getMonth(getDate(item.datetime_local)),
                    day: getDay(getDate(item.datetime_local)),
                    year: getYear(getDate(item.datetime_local))
                };
            },
            templates: {
                group: 'base',
                detail: false,
                item_detail: false,
                options: {
                    content: Spice.seat_geek_sports.item,
                    moreAt: true,
                    rating: false
                }
            }
        });
    };
}(this));