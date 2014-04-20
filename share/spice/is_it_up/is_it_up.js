(function(env) {    
    env.ddg_spice_is_it_up = function(api_result) {
        "use strict";

        if(!api_result){
            return;
        }

        api_result['status_code'] = (api_result['status_code'] === 1);

        Spice.add({
            id: 'is_it_up',
            name: 'Domain status',
            data: api_result,
            meta: {
                sourceUrl: 'http://isitup.org/' + api_result['domain'],
                sourceName: 'Is it up?'
            },
            templates: {
                detail: Spice.is_it_up.detail
            }
        });
    }
}(this));

