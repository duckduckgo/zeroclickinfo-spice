(function (env) {
    "use strict";
    env.ddg_spice_terms_of_service = function(api_result){
        
        if (!api_result || api_result.error) {
            return Spice.failed('terms_of_service');
        }

        Spice.add({
            id: "terms_of_service",
            name: "Terms of Service",
            data: api_result,
            meta: {
                sourceName: "Terms of Service; Didn't Read",
                sourceUrl: 'http://tosdr.org'
            },
            normalize: function(item) {
                return {
                    title: "Class " + item.class,
                    
                };
            },
            templates: {
                group: 'info'
//                 options: {
//                     content: Spice.terms_of_service.content
//                 }
            }
        });
    };
}(this));
