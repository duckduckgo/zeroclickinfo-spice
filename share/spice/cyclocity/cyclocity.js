(function (env) {
    "use strict";
    env.ddg_spice_cyclocity = function(api_result){

        if (api_result.error || api_result.length === 0) {
            return Spice.failed('cyclocity');
        }

        Spice.add({
            id: "cyclocity",
            name: "Bikes",
            data: api_result,
            meta: {
                sourceName: "Cyclocity",
                sourceUrl: "http://www.cyclocity.com"
            },
            templates: {
                group: 'base',
                options: {
                    content: Spice.cyclocity.content,
                    moreAt: true
                }
            },
            relevancy : {

                skip_words: [
                    "bike",
                    "bicycle",
                    "bycycle",
                    "self-service",
                    "shared",
                    "service",
                    "city",
                    "station",
                    "town"
                ],

                primary: [
                    { required: 'commercial_name' },
                    { key: 'cities', strict: false },
                    { key: 'commercial_name', strict: false }
                ],

                dup: 'commercial_name'

            }
        });
    };
}(this));
