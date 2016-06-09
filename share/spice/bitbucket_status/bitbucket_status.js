(function (env) {
    "use strict";
    env.ddg_spice_bitbucket_status = function(api_result) {

        if (!api_result) {
            return Spice.failed('bitbucket_status');
        }
        
        var dataDetails = {
            status: api_result.status.indicator,
            description: api_result.status.description
        };

        Spice.add({
            id: "bitbucket_status",
            name: "Status",
            data: dataDetails,
            signal: 'low',
            meta: {
                sourceName: api_result.page.name, 
                sourceUrl: api_result.page.url
            },
            templates: {
                group: 'base',
                options: {
                    content: Spice.bitbucket_status.content,
                    moreAt: true
                }
            }
        });
    }

    Spice.registerHelper("BitbucketStatus_indicator", function(string1, string2, options) {
        return ((string1 === string2) ? options.fn(this) : options.inverse(this));
    });

    Spice.registerHelper("BitbucketStatus_ifNotEmpty", function(string, options) {
        return ((typeof(string) !== "undefined" && string !== '') ? options.fn(this) : options(this));
    });
}(this));
