(function(env) {
    "use strict";
    env.ddg_spice_rand_word = function(api_result) {

        if (!api_result || api_result.length === 0) {
            return Spice.failed('rand_word');
        }

        // dividing the whole array into an array of 4 elements each
        var list_of_list = [];
        while (api_result.length > 0) {
            list_of_list.push(api_result.splice(0, 4));
        }
        
        var title = 'Random Words';
        var group = 'list';
        
        if ( api_result.length === 1 ) {
            title = 'Random Word';
            group ='text';
        }
        
        Spice.add({
            id: "rand_word",
            data: {
                title: title,
                list: list_of_list
            },
            name: "Answer",
            meta: {
                sourceUrl: 'https://wordnik.com/randoml',
                sourceName: 'Wordnik',
                sourceIcon: true
            },
            templates: {
                group: group,
                options: {
                    list_content: Spice.rand_word.content,
                    moreAt: true
                }
            }
        });
    }
}(this));
