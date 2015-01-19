(function(env) {
    "use strict";
    env.ddg_spice_seat_geek_events_near_me = function(api_result) {

        if(!api_result || api_result.error || api_result.events.length === 0) {
            return Spice.failed('seat_geek');
        }

        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

        Spice.add({
            id: "seat_geek",
            name: "Concerts",
            data: api_result.events,
            meta: {
                sourceName: "SeatGeek",
                // just looking for "concerts" seems to return results near you
                sourceUrl: "https://seatgeek.com/search?search=concert",
                sourceIconUrl: "https://seatgeek.com/favicon.ico",
                itemType: "Upcoming Concerts"
            },
            normalize: function(item) {
                var date = DDG.getDateFromString(item.datetime_local),
                    dateString = date.getDate() + " " + months[date.getMonth()] + ", " + date.getFullYear(),
                    priceString = "",
                    performersString = "",
                    longDescription = "";

                // SeatGeek only seems to offer prices on US shows
                // so assume price is in dollars
                if (item.stats.lowest_price) {
                    priceString += "from $" + item.stats.lowest_price;
                }

                // more than three performers probably means it's a long list
                // so let's go into a bit more detal
                if (item.performers.length > 3) {
                    performersString = $.map(item.performers, function (performer) {
                        return performer.name;
                    }).join(", ");

                    performersString = "<p>Playing are: " + performersString + ".</p>";
                }

                longDescription = "<p>" + item.venue.name + ", " + item.venue.display_location + " on " + dateString + "</p>"
                    + performersString;

                return {
                    url: item.link,
                    img_m: item.performers[0].image,
                    img: item.performers[0].image,
                    title: item.short_title,
                    description: item.venue.name + ", " + item.venue.display_location,
                    subtitle: dateString,
                    heading: item.title,
                    price: priceString,
                    abstract: longDescription
                };
            },
            templates: {
                group: 'products',
                item: 'text_item',
                detail: 'products_item_detail',
                options: {
                    moreAt: true,
                    rating: false
                }
            }
        });
    };
}(this));
