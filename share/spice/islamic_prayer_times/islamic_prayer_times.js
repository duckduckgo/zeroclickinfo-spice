(function (env) {
    "use strict";
    env.ddg_spice_islamic_prayer_times = function(api_result){

        // Validate the response
        if (!api_result || api_result.error) {
            return Spice.failed('islamic_prayer_times');
        }

        // Render the response
        Spice.add({
            id: "islamic_prayer_times",
            name: "Islamic Prayer Times",
            data: api_result.data,
            meta: {
                sourceName: "Aladhan",
                sourceUrl: "aladhan.com"
            },
            normalize: function(item){
                console.log(item.timings);
            },
            templates: {
                group: 'text',
                options: {
                    content: Spice.islamic_prayer_times.content,
                    moreAt: true
                }
            }
        });
    };
}(this));
