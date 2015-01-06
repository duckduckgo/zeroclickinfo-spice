(function (env) {
    "use strict";
    env.ddg_spice_bacon_ipsum = function(api_result){


        if (!api_result || api_result.error) {
            return Spice.failed('bacon_ipsum');
        }

        var pageContent = '';
        for (var i in api_result) {
            pageContent += "<p>" + api_result[i] + "</p>";
        }

        Spice.add({
            id: 'bacon_ipsum',
            name: 'Bacon Says...',
            data: {
                content: pageContent,
                title: "Bacon Ipsum",
                subtitle: "Randomly generated text"
            },
            meta: {
                sourceName: 'Bacon Ipsum',
                sourceUrl: 'http://baconipsum.com/'
            },
            templates: {
                group: 'text',
                options: {
                    content: Spice.bacon_ipsum.content
                }
            }
        });
    };
}(this));
