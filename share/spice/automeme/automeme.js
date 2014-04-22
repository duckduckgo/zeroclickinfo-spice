(function(env) {
    'use strict';

    env.ddg_spice_automeme = function(api_result) {

        if (!api_result.length) {
            return;
        }

        Spice.add({
            id: 'automeme',
            name: 'Automeme',
            data: {meme: api_result[0]}, //currently can't pass an array or string to data
            meta: {
                // itemType: 'Automeme',
                sourceName: 'Autome.me',
                sourceUrl: 'http://autome.me/',
            },
            templates: {
                detail: Spice.automeme.detail
            }
        });
    }
})(this);