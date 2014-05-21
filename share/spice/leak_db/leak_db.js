(function(env){
    env.ddg_spice_leak_db = function(api_result){
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

        var keys = []

        for(var key in api_result.hashes){
            keys.push(key);
        }
        console.log(api_result.hashes);
        console.log(keys);
        
        Spice.add({
            id: 'leak_db',
            name: 'Leak_db',
            data: api_result,
            meta: {
                sourceUrl       : 'http://leakdb.abusix.com/?q='
                                + encodeURIComponent(query),
                sourceName      : 'leakdb.abusix.com',

            },
            templates: {
                group: 'base',
                options:{
                    content: 'record',
                    moreAt: true
                }
            },
            normalize: function(item){
                return{
                    record_keys: keys
                };
            }  
        });
    }
}(this));