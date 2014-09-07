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
                return {
                    title: api_result[0].title,
                    image: api_result[0].image,
                    url: api_result[0].links.shortUrl,
                    actors: api_result[0].actors,
                    links: api_result[0].links,
                    affiliates: api_result[0].affiliates

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

    Handlebars.registerHelper("createLinks", function(affiliates) {
        "use strict";

        var hasOwn = Object.prototype.hasOwnProperty,
            results = [];

        for(var index in affiliates) {
            if(hasOwn.call(affiliates, index) && affiliates[index].price !== "") {
                affiliates[index].friendlyName = affiliates[index].friendlyName.replace(/ Rental$/, "");
                results.push(new Handlebars.SafeString(' <a href="' + affiliates[index].url + '">' + affiliates[index].friendlyName + '</a>'));
            }
        }
        return results;
    });

    Handlebars.registerHelper("createMore", function(links) {
        "use strict";

        var results = [];
        var friendlyName = '';

        for(var index in links) {
            if(index == "rottentomatoes") {
                friendlyName = "Rotten Tomatoes";
            } else if(index == "imdb") {
                friendlyName = "IMDB";
            }
            else {
                break;
            }

            results.push(new Handlebars.SafeString(' <a href="' + links[index] + '">' + friendlyName + '</a>'));
        }

        return results;
    });
}(this));