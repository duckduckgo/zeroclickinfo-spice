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
                sourceName: sourceName,
                sourceUrl:  sourceUrl
            },
            templates: {
                group: 'products_simple',
                detail: Spice.rx_info.rx_info,
                item_detail: Spice.rx_info.rx_info,
                options: {
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
                    abstract: item.ndc11,
                    heading: heading,
                    title: heading,
                    ratingText: item.ndc11,
                    active: active,
                    inactive: inactive,
                    proxyImageUrl: "https://images.duckduckgo.com/iu/?u=" + encodeURIComponent(item.imageUrl) + "&f=1"
                }
            },
            relevancy: relCheck,
        });
    };
}(this));
