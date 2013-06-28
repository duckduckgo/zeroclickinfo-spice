function ddg_spice_hash_me(api_result){
    if (!api_result || !api_result.found
            || !api_result.hashes) return;

    var query = DDG.get_query()
                .replace(/^hashme\s+|\s+hashme$/i, '');
    var type  = api_result.type == 'plaintext' ?
                    query : api_result.type + ' hash';

    api_result.hashes = api_result.hashes[0];

    Spice.render({
        data             : api_result,
        header1          : type + " (HashMe)",
        source_url       : 'http://leakdb.abusix.com/?q='
                            + encodeURIComponent(query),
        source_name      : 'leakdb.abusix.com',
        template_normal  : 'hash_me',
        force_big_header : true,
        force_no_fold    : true
    });
}

Handlebars.registerHelper('list', function(hash, skip, options) {
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
