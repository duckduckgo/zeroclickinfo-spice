function ddg_spice_translate_detect (api_result) {

    if (!api_result.data.detections.length) return;

    var params = get_params("detect", api_result);

    // translate single word
    if (params.phrase_len === 1 && params.from && params.to) {

        // Wordreference API only supports translations
        // to or from English...
        if (params.from_to.indexOf("en") === -1) {
            endpoint = '/js/spice/translate/from_to_phrase/';
            nrj(endpoint + params.short_from + '/' + params.short_to + '/' + params.phrase);
        } else {
            endpoint = '/js/spice/translate/from_to/';
            nrj(endpoint + params.from_to + '/' + params.phrase);
        }
    }
}


// Helper to get only unique translations
Handlebars.registerHelper('getTerms', function(input, options){
    var translations = [];
    var unique = {};

    // iterate over each object and its keys
    // in the "input" object
    $.map(input, function(value, key) {
        $.map(value, function(value2, key2) {

            if (key2 !== "OriginalTerm" && value2.term && !unique[value2.term]){
                unique[value2.term] = 1; //keep track of unique translations
                translations.push( {word: value2.term} );
            }
        });
    });
    return options.fn(translations);
});
