(function (env) {
    "use strict";
    env.ddg_spice_time = function(api_result){

        if (!api_result) {
            return Spice.failed('time');
        }
        
        Spice.add({
            id: "time",
            name: "AnswerBar title",
            data: api_result,
            meta: {
                sourceName: "Example.com",
                sourceUrl: 'http://example.com/url/to/details/' 
            },
            templates: {
                group: 'your-template-group',
                options: {
                    content: Spice.time.content,
                    moreAt: true
                }
            }
        });
    };
}(this));

