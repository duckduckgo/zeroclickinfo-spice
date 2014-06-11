!function(env) {
    "use strict";
    // We attach this anonymous function to the global object `env`
    // so that it's accessible everywhere.
    env.ddg_spice_kwixer = function(api_result) {
        // Check if there is anything in the `api_result` before doing anything.
        if (!api_result || 0 === !api_result.length) {
            return Spice.failed("kwixer");
        }
        // We're going to use this to only get the actor from the original query.
        var skip_re = new RegExp([ "new movies with", "new movies featuring", "new movies starring", "new movie with", "new movie featuring", "new movie starring", "newest movies with", "newest movies featuring", "newest movies starring", "newest movie with", "newest movie featuring", "newest movie starring", "new films with", "new films starring", "new films featuring", "new film with", "new film starring", "new film featuring", "newest films with", "newest films starring", "newest films featuring", "newest film with", "newest film starring", "newest film featuring", "movie with", "movies with", "movies starring", "film with", "films with", "films starring", "film starring", "movies featuring", "films featuring", "movies with the", " the " ].join("|"), "ig");
        var query = DDG.get_query(), finalArray = [], remainder = $.trim(query.replace(skip_re, "")), remainderArray = remainder.split(" ");
        // We need to go through each item in the array
        // and check if we got relevant results.
        for (var i = 0; i < api_result.length; i++) {
            var item = api_result[i], isRelevant = !1, actors = item.ResourceDetails2.toLowerCase();
            // The method for checking which actors are relevant is pretty simple,
            // and it might need some some updating because it's too naive.
            for (var j = 0; j < remainderArray.length; j++) {
                if (-1 !== actors.indexOf(remainderArray[j])) {
                    isRelevant = !0;
                    break;
                }
            }
            // Filter out items with bad images or with default images.
            if (isRelevant && item.ResourceImageUrl && item.ResourceImageUrl.length && /jpe?g|png/i.test(item.ResourceImageUrl)) {
                finalArray.push(item);
            }
        }
        // Check if there's anything in the `finalArray`.
        if (0 === finalArray.length) {
            return Spice.failed("kwixer");
        }
        // Display our Spice.
        Spice.add({
            id: "kwixer",
            name: "Movies",
            data: finalArray,
            meta: {
                sourceName: "Kwixer",
                sourceUrl: "https://www.kwixer.com/#/explore?category=movie&query=" + DDG.get_query_encoded(),
                itemType: "Movies"
            },
            normalize: function(item) {
                return {
                    image: item.ResourceImageUrl,
                    img_m: item.ResourceImageUrl,
                    title: item.ResourceTitle,
                    heading: item.ResourceTitle,
                    ratingText: item.ResourceYear,
                    url: "https://kwixer.com/#/watching/movie/" + item.ResourceId
                };
            },
            templates: {
                group: "media",
                detail: "products_item_detail",
                item: "basic_image_item",
                options: {
                    rating: !1,
                    variant: "poster",
                    buy: Spice.kwixer.buy
                }
            }
        }), // We're going to use this to hide the title of the template.
        // We want the poster to take up the whole tile.
        Spice.getDOM("kwixer").find(".tile__body").hide();
    }, // The separator that we get from the API is `;`, but it looks better with
    // commas.
    Handlebars.registerHelper("formatDetail", function(str) {
        var list = str.split(/;/g);
        // We need to make each actor into a link, too, so that we can click on their names.
        for (var i = 0; i < list.length; i++) {
            list[i] = "<a href='/?q=" + encodeURIComponent(list[i]) + "'>" + list[i] + "</a>";
        }
        return list.join(", ");
    });
}(this);