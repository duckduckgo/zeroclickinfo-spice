function ddg_spice_octopart (api_result) {
    "use strict";

    if(!api_result || !api_result.results || api_result.results.length === 0) {
        return Spice.failed('octopart');
    }

    // var results = [],
    //     isRelevant,
    //     skip_words = [
    //         "datasheet",
    //         "specs",
    //         "octopart"
    //     ];

    // for(var i = 0; i < api_result.results.length; i += 1) {
    //     var iter = api_result.results[i];

    //     // Checks both the MPN and the manufacturer if the query is somehow relevant.
    //     isRelevant = DDG.isRelevant(iter.item.mpn, skip_words, 4, true) || 
    //         DDG.isRelevant(iter.item.manufacturer.displayname, skip_words, 4, true);

    //     // Check if we have images.
    //     if(iter.item.images.length > 0 && isRelevant) {
    //         results.push(iter);
    //     // If an image doesn't exist, add a different image.
    //     } else if(isRelevant) {
    //         iter.item.images.push({
    //             url_90px: "http://n1.octostatic.com/o3web/detail/images/camera-icon.png"
    //         });
    //         results.push(iter);
    //     }
    // }

    // if(results.length === 0) {
    //     return;
    // }

    var isMobile = $('.is-mobile').length;

    Spice.add({
        id: 'octopart',
        name: 'Parts',
        data: api_result.results,
        signal: 'high',
 
        meta: {
            itemType: 'Parts',
            sourceName: 'Octopart',
            sourceUrl : 'http://octopart.com/partsearch#search/requestData&q=' + api_result.request.q
        },
        normalize: function(item) {
            var img = DDG.getProperty(item, "item.images.0.url_90px");
            var desc_length = 60;
            var description = (isMobile ? 
                Handlebars.helpers.ellipsis(DDG.strip_html(item.item.short_description), desc_length) :
                DDG.strip_html(item.item.short_description));

            return {
                brand: item.item.manufacturer.displayname,
                price: item.item.avg_price[1] + ' ' + item.item.avg_price[0].toFixed(2),
                img: img,
                img_m: img,
                url: item.item.detail_url,
                title: DDG.strip_html(item.item.mpn).toUpperCase(),
                heading: DDG.strip_html(item.item.mpn).toUpperCase(),
                description: description,
                datasheet: item.item.datasheets[0].url
            };
        },

        templates: {
            group: 'products',
            options: {
                rating: false,
                detailVariant: 'light',
                buy: Spice.octopart.buy
            }
        }
        
    });
};

// Handlebars.registerHelper("toFixed", function(number) {
//     "use strict";

//     return number.toFixed(2);
// });
