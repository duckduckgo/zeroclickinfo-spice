(function(env) {    
    env.ddg_spice_is_it_up = function(response) {
        "use strict";

        if(!response){
            return;
        }

        response['status_code'] = (response['status_code'] === 1);

        Spice.add({
            id: 'is_it_up',
            name: 'Is it up?',
            data: response,
            meta: {
                sourceUrl: 'http://isitup.org/' + response['domain'],
                sourceName: 'Is it up?'
            },
            templates: {
                detail: Spice.is_it_up.detail
            }
        });
    }
}(this));