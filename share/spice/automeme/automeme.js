(function(env) {
    'use strict';

    env.ddg_spice_automeme = function(api_result) {

        if (!api_result.length) {
            return;
        }

        Spice.add({
            id: 'automeme',
            name: 'Automeme',
            data: api_result,
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