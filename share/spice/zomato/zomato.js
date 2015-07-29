(function (env) {
    "use strict";
    var query_orig = DDG.get_query();
    
    //$.getJSON('http://dheerajavvari.zdev.net/duckducktrack.php?value='+encodeURIComponent(query_orig));
    
    env.ddg_spice_zomato = function(api_result){
        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error) {
            return Spice.failed('zomato');
        }

        // Render the response
        // console.log(api_result);
        DDG.require('maps', function(){
            //DDG.require('moment.js', function(){
                Spice.add({
                    id: "zomato",
                    name: "Places",
                    model: "Place",
                    view: "Places",
                    signal: "high",
                    data: api_result.restaurants,
                    meta: {
                        sourceName: "Zomato",
                        sourceUrl: 'http://www.zomato.com',
                        snippetChars: 110,
                        sourceIcon: true,
                        itemType: 'Places',
                        searchTerm: query_orig
                    },
                    templates: {
                        group: 'places',
                        //item: 'basic_flipping_item',
                        options: {
                            //front_content: Spice.zomato.z_front,
                            //back_content: Spice.zomato.z_back
                            moreAt: true
                        }
                    },
                    relevancy: {
                        dup: 'url'
                    },
                    normalize: function(o) {
                        var res = o.restaurant;
                        console.log(res);
                        if(!res) {
                            return null;
                        }
                        var estd = res.establishment_types.map(function(elem){
                                        return elem.establishment_type.name;
                                    }).join(", ");

                            //cost_for_two: res.average_cost_for_two,
                            //currency: res.currency,
                            //currency_affix: res.currency_affix,
                        
                        
                        // For places_item
                        var loc_link_str = '<a href="https://maps.google.com/q='+res.location.locality + ', ' + res.location.city+'">'+res.location.locality + ', ' + res.location.city+'</a>';
                        var address_link_str = '<a href="https://maps.google.com/q='+res.location.address+'">'+res.location.address+'</a>';
                        var data = {
                            name: res.name,
                            url: res.url,
                            image: res.thumb,
                            altSubtitle: estd,
                            price: res.price_range,
                            reviews: res.user_rating.votes,
                            rating: res.user_rating.aggregate_rating,
                            address: res.location.address,
                            phone: res.mobile_phone_display,
                            city: res.location.locality + ', ' + res.location.city,
                            lat: res.location.latitude,
                            lon: res.location.longitude
                        };
                        /*
                        // For basic_flipping_item
                        var data = {
                            data_front: {
                                name: res.name,
                                image: res.thumb,
                                altSubtitle: estd,
                                reviews: res.user_rating.votes,
                                rating: res.user_rating.aggregate_rating,
                                venue: res.location.locality,
                                hours: {
                                    Thu: '8am - 5pm'
                                }
                            },
                            data_back: {
                                name: res.name,
                                url: res.url,
                                price: 2,
                                address: res.location.locality,
                                phone: res.mobile_phone_display
                            },
                            city: res.location.city,
                            place: res.location.locality,
                            lat: res.location.latitude,
                            lon: res.location.longitude
                        };
                        */
                        /*
                        // For base_flipping_item
                        var data = {
                            name: res.name,
                            reviews: res.user_rating.votes,
                            rating: res.user_rating.aggregate_rating,
                            url: res.url,
                            price: 2,
                            address: res.location.address,
                            place: res.location.locality,
                            city: res.location.city,
                            lat: res.location.latitude,
                            lon: res.location.longitude
                        };
                        */
                        console.log(data);
                        return data;
                    }
                });
            //});
        });
    };
}(this));
