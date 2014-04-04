function ddg_spice_octopart (api_result) {

    console.log(api_result);

    // if(!api_result || !api_result.results || api_result.results.length === 0) {
    //     return;
    // }

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

    Spice.add({
        id: "octopart",
        name: 'Parts',
        view: "Tiles",
        data: api_result.results,

        templates: {
            item: DDG.templates.products_item,
            detail: DDG.templates.products_item_detail
        },

        meta: {
            // total: api_result.results.length,
            // itemType: 'showing n of m results',
            sourceName: 'Octopart',
			sourceUrl : 'http://octopart.com/partsearch#search/requestData&q=' + api_result.request.q,
            // sourceLogo: {
            //     url: DDG.get_asset_path('quixey','quixey_logo.png'),
            //     width: '45',
            //     height: '12'
            // }
        },

        normalize: function(item) {
            return {
                brand: item.item.manufacturer.displayname,
                price: item.item.avg_price[1] + ' ' + item.item.avg_price[0].toFixed(2),
                img:   DDG.getProperty(item, "item.images.0.url_55px"),
                img_m: this.img,
				url_review: item.item.detail_url,
                title: DDG.strip_html(item.item.mpn),
                heading: DDG.strip_html(item.highlight)
            };
        }

        
    });
};

Handlebars.registerHelper("toFixed", function(number) {
    return number.toFixed(2);
});


