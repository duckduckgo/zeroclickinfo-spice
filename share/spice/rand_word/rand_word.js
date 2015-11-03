(function(env) {
    "use strict";
    env.ddg_spice_rand_word = function(api_result) {

        if (!api_result || api_result.length === 0) {
            return Spice.failed('rand_word');
        }
        
        var first = api_result[0];

        // dividing the whole array into an array of 4 elements each
        var list_of_list = [];
        while (api_result.length > 0) {
            list_of_list.push(api_result.splice(0, 4));
        }

        var spiceObj =  {
            id: "rand_word",
            data: {
                title: 'Random Words',
                list: list_of_list
            },
            name: "Answer",
            meta: {
                sourceUrl: 'https://wordnik.com/randoml',
                sourceName: 'Wordnik',
                sourceIcon: true
            },
            templates: {
                group: 'list',
                options: {
                    list_content: Spice.rand_word.content,
                    moreAt: true
                }
            }
        };
        
        if ( list_of_list.length == 1 ) {
            spiceObj.data = {
                title: "Random Word",
                word: first.word
            };
            
            spiceObj.templates = {
                group: 'text',
                options: {
                    content: Spice.rand_word.single_word,
                    moreAt: true
                }
            };
        }
        
        Spice.add( spiceObj );
        
    }
}(this));
