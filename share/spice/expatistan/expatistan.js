(function(env) {
    env.ddg_spice_expatistan = function(api_result) {
        "use strict";

        if(!api_result || api_result.status !== 'OK') {
            return Spice.failed('expatistan');
        }

        Spice.add({
            id: "expatistan",
            name: "Answer",
            data: api_result,
            meta: {
                sourceUrl: api_result.source_url,
                sourceName: 'Expatistan'
            },
            normalize: function(item) {
                // Split abstract in order to get
                // two separate strings and modify the first
                if (!api_result.abstract) {
                    return null;
                }

                var lines = api_result.abstract.split(/of\s[0-9]+\s/);
                var cost = api_result.abstract.match(/\s[0-9]+\s/);

                var firstLine = '';
                var secondLine = '';
                if (lines.length === 2 && cost.length >= 1) {
                    firstLine = lines[0].replace(' has a', '') + ' =' + cost[0];
                    secondLine = lines[1];
                }
                return {
                    title: DDG.strip_html(firstLine),
                    ourContent: secondLine
                };
            },
            templates: {
                group: 'text',
                options: {
                    content: Spice.expatistan.content,
                    moreAt: true
                }
            }
        });
    }
}(this));
