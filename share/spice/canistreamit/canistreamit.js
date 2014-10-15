(function(env) {
    "use strict";

    env.ddg_spice_canistreamit = function(api_result) {

        if(!api_result || api_result.length === 0) {
            return Spice.failed('canistreamit');
        }

        // TODO: relevancy block
        if(!DDG.isRelevant(api_result[0].title, ["stream", "watch", "streaming", "can", "i", "how", "where", "find", "to"], 3)) {
            return Spice.failed('canistreamit');
        }

        Spice.add({
            id: 'canistreamit',
            name: 'Streaming',
            data: api_result,
            meta: {
                sourceName: "Can I Stream.it?",
                sourceUrl: api_result[0].links.shortUrl
            },
            normalize: function(item) {
                var infoboxData = [{
                    heading: 'Viewing Options'
                }];

                var affiliates = api_result[0].affiliates;
                for(var key in affiliates) {
                    if(affiliates[key].price !== "") {
                        infoboxData.push({
                            label: affiliates[key].friendlyName.replace(/ Rental$/, ""),
                            value: "Rent $" + affiliates[key].price
                        });
                    }
                }

                return {
                    title: api_result[0].title,
                    sub: api_result[0].year,
                    rating: api_result[0].rating,
                    percentage: parseInt((api_result[0].rating/5)*100) + "%",
                    actors: api_result[0].actors,
                    image: api_result[0].image,
                    url: api_result[0].links.shortUrl,
                    description: api_result[0].description,
                    links: api_result[0].links,
                    infoboxData: infoboxData

                };
            },
            templates: {
                group: 'info',
                options: {
                    content: Spice.canistreamit.canistreamit
                }
            },

        });
    };

    Handlebars.registerHelper("createMore", function(links) {
        "use strict";

        var results = [];
        var friendlyName = '';

        for(var index in links) {
            if(index == "rottentomatoes") {
                friendlyName = "Rotten Tomatoes";
            } else if(index == "imdb") {
                friendlyName = "IMDB";
            } else {
                break;
            }

            results.push(new Handlebars.SafeString(' <a href="' + links[index] + '">' + friendlyName + '</a>'));
        }

        return results;
    });
}(this));