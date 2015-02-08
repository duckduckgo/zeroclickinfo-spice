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

                // Vars
                var city, cost, subtitle, title;

                // Guard if abstract or source_url don't exist
                if (!api_result.abstract || !api_result.source_url) {
                    return Spice.failed('expatistan');
                }

                // We have a comparison result return the full abstract
                if(api_result.source_url.match(/comparison/)) {
                    title = api_result.abstract;
                } else {
                // We have a single result extract the index and create a subtitle
                    city = api_result.abstract.match(/<b>(.*?)<\/b>/g)[0];
                    title = api_result.abstract.match(/\s[0-9]+\s/)[0];
                    subtitle = city + " - Cost of living index (Expatistan's scale)";
                }

                return {
                    title: DDG.strip_html(title),
                    subtitle: DDG.strip_html(subtitle)
                };
            },
            templates: {
                group: 'text',
                options: {
                    moreAt: true
                }
            }
        });
    }
}(this));
