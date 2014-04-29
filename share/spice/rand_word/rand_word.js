(function(env) {
    "use strict";
    env.ddg_spice_rand_word = function(api_result) {

    if (!api_result.word) {
        return;
    }

    Spice.add({
	   id: "rand_word",
        data: api_result,
        name: "Random Word",
        meta: {
            sourceUrl: 'http://wordnik.com',
            sourceName: 'Wordnik',
            sourceIcon: true
        },
        template_group: 'info',
        templates: {
                options: {
                    content: Spice.rand_word.content
                }
            }
    });
}
}(this));