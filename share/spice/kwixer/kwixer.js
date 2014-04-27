(function(env) {
    "use strict";

    env.ddg_spice_kwixer = function(api_result) {
        
        if(!api_result || !api_result.length === 0) {
            return;
        }

        var skip_re = new RegExp([
            'new movies with',
            'new movies featuring',
            'new movies starring',
            'new movie with',
            'new movie featuring',
            'new movie starring',
            'newest movies with',
            'newest movies featuring',
            'newest movies starring',
            'newest movie with',
            'newest movie featuring',
            'newest movie starring',
            'new films with',
            'new films starring',
            'new films featuring',
            'new film with',
            'new film starring',
            'new film featuring',
            'newest films with',
            'newest films starring',
            'newest films featuring',
            'newest film with',
            'newest film starring',
            'newest film featuring',
            'movie with',
            'movies with',
            'movies starring',
            'film with',
            'films with',
            'films starring',
            'film starring',
            'movies featuring',
            'films featuring',
            'movies with the',
            ' the '
        ].join("|"), "ig");

        var query = DDG.get_query(),
            finalArray = [],
            remainder = query.toLowerCase().replace(skip_re, "").trim(),
            remainderArray = remainder.split(" ");

        for(var i = 0; i < api_result.length; i++) {
            var item = api_result[i],
                isRelevant = false,
                actors = item.ResourceDetails2.toLowerCase();

            for(var j = 0; j < remainderArray.length; j++) {
                if(actors.indexOf(remainderArray[j]) !== -1) {
                    isRelevant = true;
                    break;
                }
            }

            if(isRelevant && item.ResourceImageUrl &&
                    item.ResourceImageUrl.length &&
                    (/jpe?g|png/i).test(item.ResourceImageUrl)) {
                item.ResourceImageUrl = item.ResourceImageUrl.replace("large_", "medium_");
                finalArray.push(item);
            }
        }

        if (finalArray.length === 0) {
            return;
        }

        Spice.add({
            id: 'kwixer',
            name: 'Movie Actors',
            data: finalArray,
            meta: {
                sourceName: 'Kwixer',
                sourceUrl: "https://www.kwixer.com/#/explore?category=movie&query=" + DDG.get_query_encoded(),
                itemType: "Movies"
            },
            normalize: function(item) {
                return {
                    image: item.ResourceImageUrl,
                    title: item.ResourceTitle,
                    ratingText: item.ResourceYear.toString(),
                    rating: "unrated"
                }
            },
            templates: {
                item: 'basic_image_item',
                detail: Spice.kwixer.kwixer_detail
            }
        });
    };

    Handlebars.registerHelper("formatDetail", function(s) {
        return s.replace(';', ', ');
    });
}(this));