(function (env) {
    "use strict";
    var query_orig = DDG.get_query();
    //$.getJSON('http://dheerajavvari.zdev.net/duckduckgo/ddg_track?value='+encodeURIComponent(query_orig));
    env.ddg_spice_zomato = function(api_result){
        if (!api_result || api_result.error) {
            return Spice.failed('zomato');
        }
        var hours, data;
        Spice.add({
            id: "zomato",
            name: "Places",
            model: "Place",
            view: "Places",
            signal: "high",
            data: api_result.restaurants,
            meta: {
                sourceName: "Zomato",
                sourceUrl: api_result.more_at,
                snippetChars: 110,
                sourceIcon: true,
                sourceIconurl: 'https://www.zomato.com/images/logo/zomato_favicon3.png',
                itemType: 'Places',
                searchTerm: query_orig
            },
            templates: {
                group: 'places',
                options: {
                    moreAt: true
                }
            },
            relevancy: {
                dup: 'url'
            },
            normalize: function(res) {
                if(!res) {
                    return null;
                }
                if(res.all_timings && res.all_timings.length) {
                    hours = {
                        "Mon": res.all_timings[0].time,
                        "Tue": res.all_timings[1].time,
                        "Wed": res.all_timings[2].time,
                        "Thu": res.all_timings[3].time,
                        "Fri": res.all_timings[4].time,
                        "Sat": res.all_timings[5].time,
                        "Sun": res.all_timings[6].time
                    };
                }
                
                // For places_item
                data = {
                    id: res.id,
                    name: res.name,
                    url: res.url,
                    image: res.thumb,
                    boosted: res.boosted,
                    price: res.price,
                    reviews: res.reviews,
                    rating: res.rating,
                    address: res.address,
                    phone: res.phone,
                    closed: !res.closed,
                    neighbourhood: res.neighbourhood,
                    city: res.city,
                    returned_categories: res.returned_categories,
                    hours: hours,
                    engine: "Zomato",
                    coordinates: {
                        longitude: res.coordinates.longitude,
                        latitude: res.coordinates.latitude
                    }
                };
                return data;
            }
        });
    };
}(this));
