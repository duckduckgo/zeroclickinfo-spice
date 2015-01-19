(function(env) {
    "use strict";
    env.ddg_spice_seat_geek_events_by_venue = function(api_result) {

        if(!api_result || api_result.error || api_result.events.length === 0) {
            return Spice.failed('seat_geek');
        }

        var query = DDG.get_query(),
            months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

        Spice.add({
            id: "seat_geek",
            name: "Concerts",
            data: api_result.events,
            meta: {
                sourceName: "SeatGeek",
                sourceUrl: "https://seatgeek.com/search?search=" + query,
                sourceIconUrl: "https://seatgeek.com/favicon.ico",
                itemType: "Upcoming Concerts"
            },
            normalize: function(item) {
                var date = DDG.getDateFromString(item.datetime_local),
                    dateString = date.getDate() + " " + months[date.getMonth()] + ", " + date.getFullYear(),
                    description = item.venue.name + ", " + item.venue.display_location;

                return {
                    url: item.link,
                    title: item.short_title,
                    description: description,
                    subtitle: dateString
                };
            },
            templates: {
                group: 'products',
                item: 'text_item',
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
