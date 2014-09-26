(function(env) {
    "use strict";

    // Prevent jQuery from appending "_={timestamp}" in our url when we use $.getScript.
    // If cache was set to false, it would be calling /js/spice/steam/list_specials/hello?_=12345
    // and that's something that we don't want.
    $.ajaxSetup({ cache: true });
    var queryexec;
    
    // Fetch our json and pass to getScript
    env.ddg_spice_steam_specials = function(api_result) {
        if(!api_result) {
            return Spice.failed('specials');  
        }

        var idarray = api_result.specials.items;
        queryexec = encodeURIComponent($.map(idarray, function(elem) {
                return elem.id;
        }).join(","));
        $.getScript("/js/spice/steam/list_specials/" + queryexec);
    };

    env.ddg_spice_steam_list_specials = function(api_result) {
        if (!api_result) {
            return Spice.failed('specials');
        }

        var query = decodeURIComponent(queryexec);
    
        // Extract our query
        var gameids = query.split(",");
        var results = [];
        var j = 0;
        var genre = [];

        // Organize data to display
        for(var i = 0; i < gameids.length; i++) {
            if(api_result[gameids[i]].success == true) { //successfully fetched information on game
                
                results.push(api_result[gameids[i]].data.price_overview);
                results[j].url = "http://store.steampowered.com/app/"+api_result[gameids[i]].data.steam_appid;
                results[j].dev = api_result[gameids[i]].data.developers[0];
                results[j].name = api_result[gameids[i]].data.name;
                results[j].image = api_result[gameids[i]].data.header_image;
                
                if(api_result[gameids[i]].data.metacritic) {
                    results[j].metacritic = api_result[gameids[i]].data.metacritic.score;
                } 
                
                if(api_result[gameids[i]].data.genres) {
                    $.each(api_result[gameids[i]].data.genres, function(index, value) {
                        genre.push(value.description);
                    });
                    results[j].genre = genre.join(", ");
                }
                
                results[j].platforms = api_result[gameids[i]].data.platforms;
                for (var platform in results[j].platforms) {
                    if(results[j].platforms[platform] == "No") {
                         delete results[j].platforms[platform];
                    }
                }
              
                //results[j].ss = (api_result[gameids[i]].data.screenshots).slice(0,4); //screenshots maybe used in future
                genre = [];
                j++;
            }
        }

        
        // Return if not able to retrieve information for any game
        if(!results.length) {
            return Spice.failed('specials');
        }

        Spice.add({
            id: "specials",
            name: "Steam Specials",
            data: results,
            meta: {
                itemType: "Specials",
                sourceUrl: 'http://store.steampowered.com/search/?specials=1',
                sourceName: 'Steam'
            },
            normalize: function(item) {
                console.log(item.dev);
                return {
                    image: item.image,
                    img: item.image,
                    img_m: item.image,
                    heading: item.name,
                    url: item.url,
                    price: "$" + (item.final/100),  
                    brand: item.dev,
                    rating: item.metacritic,
                    original_price: "$" + (item.initial/100),
                    discount: item.discount_percent + "%"
                };
            },
            templates: {
                group: 'products',
                options: {
                    buy: Spice.steam_specials.buy,
                    rating: false
                }
            }
        });
    };
}(this));
