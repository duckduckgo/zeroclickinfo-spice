function ddg_spice_hash_me(api_result){
    if (!api_result || !api_result.found
            || !api_result.hashes) return;

    var query = DDG.get_query().replace(/hashme/i, '');
    Spice.render({
        data             : api_result,
        header1          : query + " (HashMe)",
        source_url       : 'http://leakdb.abusix.com/?q='
                            + encodeURIComponent(query),
        source_name      : 'leakdb.abusix.com',
        template_normal  : 'hash_me',
        force_big_header : true,
        force_no_fold    : true
    });
}

Handlebars.registerHelper('list', function(hash, options) {
    if (hash.plaintext) delete hash.plaintext;
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
