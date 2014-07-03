(function(env) {
    "use strict";
    env.ddg_spice_rand_word = function(api_result) {

        if (!api_result || !api_result.word) {
            return Spice.failed('rand_word');
        }

        Spice.add({
            id: "rand_word",
            data: api_result,
            name: "Answer",
            meta: {
                sourceUrl: 'http://wordnik.com',
                sourceName: 'Wordnik',
                sourceIcon: true
            },
            templates: {
                group: 'base',
                options: {
                    content: Spice.rand_word.content,
            moreAt: true
                }
            }
        });
    }
}(this));
