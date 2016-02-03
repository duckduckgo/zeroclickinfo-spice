(function(env) {
    "use strict";
    env.ddg_spice_seat_geek_sports = function(api_result) {

        if(!api_result || api_result.error || api_result.events.length === 0) {
            return Spice.failed('seat_geek_sports');
        }

        var query = DDG.get_query();
        var clean_query = $.trim(query.replace(/((upcoming\s)?(match(es)?))|(events?)|(schedule)|(sports)|(tickets)|(games)/, '').toLowerCase());

        DDG.require('moment.js', function() {
            Spice.add({
                id: "seat_geek_sports",
                name: "Tickets",
                data: api_result.events,
                meta: {
                    searchTerm: clean_query,
                    sourceName: "SeatGeek",
                    sourceUrl: "https://seatgeek.com/search?search=" + clean_query,
                    sourceIconUrl: "https://seatgeek.com/favicon.ico",
                    itemType: "Upcoming Events"
                },
                normalize: function(item) {
                    // Check relevancy of the item.
                    // First check if the query matches one of the performers names;
                    // if it doesn't, and it's not even relevant to the event title,
                    // check relevancy on the taxonomies. If this fails too, return null
                    var relevant = false;
                    var performer = item.performers[0];
                    var both_performers = [];
                    var title;
                    for(var i = 0; i < item.performers.length; i++) {
                        if(DDG.stringsRelevant(item.performers[i].name.toLowerCase(), clean_query, [], 3, true) || DDG.stringsRelevant(item.performers[i].short_name.toLowerCase(), clean_query, [], 3, true)) {
                            relevant = true;
                        } else {
                            performer = item.performers[i];
                        }

                        both_performers.push(item.performers[i].name);
                    }

                    if(!relevant) {
                        if(DDG.stringsRelevant(item.short_title, clean_query, [], 3, true)) {
                            relevant = true;
                        } else {
                            for(var i = 0; i < item.taxonomies.length; i++) {
                                if(DDG.stringsRelevant(item.taxonomies[i].name.toLowerCase(), clean_query, [], 3, true)) {
                                    relevant = true;
                                }
                            }
                        }

                        if(!relevant) {
                            return null;
                        } else {
                            title = both_performers.join(" vs ");
                        }
                    } else {
                        title = performer.name;
                    }

                    function getPrice(lowest, highest) {
                        var price = "";

                        if(lowest && highest) {
                            price = "$" + lowest + "+";
                        }

                        return price;
                    }

                    var eventDate = moment(item.datetime_local);
                    if (!eventDate.isValid()) {
                        return Spice.failed('seat_geek_sports');
                    }

                    return {
                        url: item.url,
                        price: getPrice(item.stats.lowest_price, item.stats.highest_price),
                        title: title,
                        place: item.venue.name,
                        city: item.venue.display_location,
                        year: eventDate.year(),
                        dateBadge: {
                            day: eventDate.date(),
                            month: eventDate.format("MMM").toUpperCase()
                        }
                    };
                },
                templates: {
                    group: 'text',
                    detail: false,
                    item_detail: false,
                    options: {
                        footer: Spice.seat_geek_sports.footer,
                        moreAt: true,
                        rating: false
                    },
                    variants: {
                        tileTitle: '3line-small',
                        tileFooter: '4line'
                    }
                }
            });
        });        
    };
}(this));
