(function (env) {
    "use strict";

    // Concatenate Ingredients
    function concatIngredients(ingredients) {
        var concatted = '';

        // Protect against the chance ingredients aren't part of the API result
        if (ingredients !== null && (typeof ingredients !== 'undefined')) {
            for (var i = 0; i < ingredients.length; i++) {
                concatted += ingredients[i] + ", ";
            }

            if (concatted.length > 0) {
                concatted = concatted.substring(0, concatted.length - 2);
            }
        }

        return concatted;
    }

    // Use matchedTerms object to build secondaryText string
    function buildSecondaryText(matchedTerms) {
        var secondaryText = "";

        // Loop through matchedTerms object for terms and values
        for (var key in matchedTerms) {
           if (matchedTerms.hasOwnProperty(key)) {
              secondaryText += key + "=" + matchedTerms[key] + ", ";
           }
        }

        // If terms were found, make secondaryText human readable
        if (secondaryText.length > 0) {
            secondaryText = "Matched: " + secondaryText.substr(0, secondaryText.length - 2) + ".";
        }

        return secondaryText;
    }

    env.ddg_spice_rx_info = function(api_result){

        if (!api_result || api_result.error || !api_result.replyStatus || !api_result.replyStatus.totalImageCount || api_result.replyStatus.totalImageCount < 1) {
            return Spice.failed('rx_info');
        }
        
<<<<<<< HEAD
        var sourceName = "DailyMed",
            sourceUrl = "http://dailymed.nlm.nih.gov/",
            itemType = "pills",
            secondaryText = buildSecondaryText(api_result.replyStatus.matchedTerms);
=======
        var script = $('[src*="/js/spice/rx_info/"]')[0],
            source = $(script).attr("src"),
            query = decodeURIComponent(source.match(/rx_info\/([^\/]+)/)[1]),
            triggerWordMatch = parseInt(source.match(/rx_info\/[^\/]+\/(\d)/)[1]),
            relCheck;
        
>>>>>>> upstream/master

        Spice.add({
            id: "rx_info",
            name: "RxInfo",
            data: api_result.nlmRxImages,
            meta: {
<<<<<<< HEAD
                itemType: itemType,
=======
                searchTerm: query,
>>>>>>> upstream/master
                sourceName: sourceName,
                sourceUrl:  sourceUrl,
                secondaryText: secondaryText
            },
            templates: {
                group: 'products_simple',
                item_detail: 'base_item_detail',
                options: {
                    content: Spice.rx_info.rx_info,
                    description_content: Spice.rx_info.rx_info_description,
                    brand: false,
                    rating: false
                }
            },
            normalize: function(item) {
                var heading  = item.ndc11,
                    active   = concatIngredients(item.ingredients.active),
                    inactive = concatIngredients(item.ingredients.inactive);

                // Not all items will have a name (drug name),
                // so when it's available use it, otherwise the
                // ndc-11 will suffice.
                if (item.name) {
                    heading = item.name;
                }

                return {
                    image: item.imageUrl,
                    imageAlt: "Image for NDC: " + item.ndc11,
                    abstract: item.ndc11,
                    heading: heading,
                    title: heading,
                    subtitle: item.labeler,
                    ratingText: item.ndc11,
                    active: active,
                    inactive: inactive,
                    url: item.splSetId ? 'https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=' + item.splSetId : ''
                }
            }
        });
    };
}(this));
