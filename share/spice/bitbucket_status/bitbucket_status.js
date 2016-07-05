(function (env) {
    "use strict";
    env.ddg_spice_bitbucket_status = function(api_result) {

        if (!api_result) {
            return Spice.failed('bitbucket_status');
        }
        
        Spice.add({
            id: "bitbucket_status",
            name: "Answer",
            data: api_result,
            normalize: function(item) {
                return {
                    status: item.status.indicator,
                    subtitle: item.status.description
                };
            },
            meta: {
                sourceName: api_result.page.name, 
                sourceUrl: api_result.page.url
            },
            templates: {
                group: 'text',
                options: {
                    title_content: Spice.bitbucket_status.title_content,
                    moreAt: true
                }
            }
        });
    }

    Spice.registerHelper("BitbucketStatus_indicator", function(string1, string2, options) {
        return ((string1 === string2) ? options.fn(this) : options.inverse(this));
    });
}(this));
