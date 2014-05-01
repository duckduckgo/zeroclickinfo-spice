(function(env) {
    'use strict';

    env.ddg_spice_automeme = function(api_result) {

        if (!api_result.length) {
            return Spice.failed('automeme')
        }

        Spice.add({
            id: 'automeme',
            name: 'Automeme',
            data: { meme: api_result[0] },
            meta: {
                sourceName: 'Autome.me',
                sourceUrl: 'http://autome.me/',
            },
            templates: {
                group: 'base',
                options: {
                    content: Spice.automeme.content,
                    moreAt: true
                }
            }
        });
    }
})(this);