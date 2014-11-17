(function (env) {
    "use strict";
    env.ddg_spice_bacon_ipsum = function(api_result){

        
        if (api_result.error) {
            return Spice.failed('bacon_ipsum');
        }

        var pageContent = '';
        for (var i in api_result) {
            pageContent += api_result[i];
        }

        Spice.add({
            id: 'bacon_ipsum',
            name: 'Bacon Says...',
            data: {
                content: pageContent
            },
            meta: {
                sourceName: 'http://baconipsum.com/',
            },
            templates: {
                group: 'base',
                options: {
                    content: Spice.bacon_ipsum.content,
                }
            }
        });
    };
}(this));
