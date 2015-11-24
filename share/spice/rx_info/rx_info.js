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

    env.ddg_spice_rx_info = function(api_result){

        if (!api_result || api_result.error || !api_result.replyStatus || !api_result.replyStatus.totalImageCount || api_result.replyStatus.totalImageCount < 1) {
            return Spice.failed('rx_info');
        }
        
        var script = $('[src*="/js/spice/rx_info/"]')[0],
            source = $(script).attr("src"),
            query = decodeURIComponent(source.match(/rx_info\/([^\/]+)/)[1]);
            triggerWordMatch = parseInt(source.match(/rx_info\/[^\/]+\/(\d)/)[1]),
            relCheck;
        

        // meta information
        var sourceName = "More at DailyMed",
            sourceUrl  = "http://dailymed.nlm.nih.gov/",
            skip_words = ['pill', 'rxinfo', 'capsule', 'tablet', 'softgel', 'caplets'];
        
        // perform relevancy checking if triggerWordMatch true
        if(triggerWordMatch) {
            relCheck = {
                skip_words : skip_words,
                primary: [
                    { key: 'name' }, { key: 'ndc11' }
                ]
            };
        }
      
        Spice.add({
            id: "rx_info",
            name: "RxInfo",
            data: api_result.nlmRxImages,
            meta: {
                searchTerm: query,
                sourceName: sourceName,
                sourceUrl:  sourceUrl
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
            },
            relevancy: relCheck,
        });
    };
}(this));
