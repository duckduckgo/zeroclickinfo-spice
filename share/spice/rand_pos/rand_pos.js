(function(env){
    "use strict";
    
    env.ddg_spice_rand_pos = function(api_result){
        if (api_result.error) {
            return Spice.failed('rand_pos');
        }
        var words = [];
        var len = api_result.length;
        for(var i=0; i<len; i++) {
            words.push(api_result[i]);
        }
        Spice.add({
            id: "rand_pos",
            data: {words:words},
            name: "Answer",
            meta: {
                sourceUrl: 'http://wordnik.com',
                sourceName: 'Wordnik',
                sourceIcon: true
            },
            templates: {
                group: 'base',
                options: {
                    content: Spice.rand_pos.content,
                    moreAt: true
                }
            }
        });
    }
}(this));