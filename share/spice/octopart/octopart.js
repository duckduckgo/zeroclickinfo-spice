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
        sourceName : 'Octopart',
        data: api_result.results,
        id: "octopart",
        sourceUrl : 'http://octopart.com/partsearch#search/requestData&q=' + api_result.request.q,
        header1 : api_result.request.q + " (Octopart)",
        view: "Tiles",
        templates: {
            item: Spice.octopart.octopart,
            detail: Spice.octopart.octopart_details
        },

        
    });
};

Handlebars.registerHelper("toFixed", function(number) {
    return number.toFixed(2);
});


