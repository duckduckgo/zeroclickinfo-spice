(function(env) {    
    env.ddg_spice_is_it_up = function(api_result) {
        "use strict";

        if(!api_result){
            return Spice.failed('is_it_up');
        }

        Spice.add({
            id: 'is_it_up',
            name: 'Answer',
            data: api_result,
            signal: 'high',
            meta: {
                sourceUrl: 'http://isitup.org/' + api_result['domain'],
                sourceName: 'Is it up?',
                sourceIcon: true
            },
            templates: {
                group: 'base',
                options: {
                    content: Spice.is_it_up.detail,
                    moreAt: true
                }
            }
        });
    }
    
    Handlebars.registerHelper ('if_value', function(a, b, options) {
        if (a === b) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }   
    });
}(this));
