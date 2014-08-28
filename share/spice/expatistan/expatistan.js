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
                var regex = /of\s[0-9]+\s/;
                var regex2 = /\s[0-9]+\s/;

                var lines = api_result.abstract.split(regex);
                var cost = api_result.abstract.match(regex2);

                var firstLine = '';
                var secondLine = '';
                if(lines.length === 2 && cost.length >= 1) {
                    firstLine = lines[0].replace(' has a', '') + ' =' + cost[0];
                    secondLine = lines[1];
                }

                var a = {
                    api_result: api_result,
                    firstLine: firstLine,
                    secondLine: secondLine
                }
                return a;
            },
            templates: {
                group: 'base',
                options: {
                    content: Spice.expatistan.content,
                    moreAt: true
                }
            }
        });
    }

    // Used on the values of firstLine and secondLine,
    // which contain html tags
    Handlebars.registerHelper("SafeString", function(string) {
        return new Handlebars.SafeString(string);
    });

}(this));