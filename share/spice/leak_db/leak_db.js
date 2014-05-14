function ddg_spice_leak_db(api_result){
    "use strict";

    if (!api_result 
        || !api_result.found
        || !api_result.hashes) {
        return;
    }

    var query = DDG.get_query()
                .replace(/^(leakdb|hashme)\s+|\s+(leakdb|hashme)$/i, '');
    var type  = api_result.type == 'plaintext' ?
                    query : api_result.type + ' hash';

    api_result.hashes = api_result.hashes[0];

    Spice.add({
        data             : api_result,
        header1          : type + " (LeakDB)",
        sourceUrl       : 'http://leakdb.abusix.com/?q='
                            + encodeURIComponent(query),
        sourceName      : 'leakdb.abusix.com',
        templates: {
            item: Spice.leak_db.leak_db,
            detail: Spice.leak_db.leak_db
        },
        
        
    });

    $("#zero_click_abstract").css({
        "margin" : "4px 12px 0px 2px !important"
    });
}

Handlebars.registerHelper('LeakDB_list', function(hash, skip, options) {
    "use strict";

    delete hash[skip];
    return Object.keys(hash)
        .sort(function(a, b) {
            return a == 'plaintext' ? -1 : 1
        })
        .reduce(function(accumulator, key) {
            return accumulator + options.fn({
                'type'  : key,
                'value' : hash[key]
            })
        }, '');
});
