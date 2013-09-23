// Check if helper already define
// in the case translate_detect was called
if (!Handlebars.helpers.getTerms) {

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
}