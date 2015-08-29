(function (env) {
    "use strict";
    env.ddg_spice_political_polls = function(api_result){

        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error) {
            return Spice.failed('political_polls');
        }
        
        var results = api_result;

        if (!results) {
            return Spice.failed('political_polls');
        }
        
        if(results.length > 50){
            results = results.splice(50);
        }

        // Render the response
        DDG.require("moment.js", function() {
        Spice.add({
            id: "polls",

            // Customize these properties
            name: "Polls",
            data: api_result,
            meta: {
                sourceName: "HuffPost Pollster",
                sourceUrl: 'http://elections.huffingtonpost.com/pollster'
            },
            templates: {
                group: 'text',
                options: {
                    detail: false,
                    item_detail: false,
                    footer: Spice.political_polls.footer,
                }
            },
            normalize: function(item) {
                    return {
                        title: item.title,
                        subtitle: item.poll_count + " polls",
                        url: item.url,
                        updateTime: moment(item.last_updated).fromNow()
                    };
                },
            sort_fields: {
                    last_updated: function(a, b) {
                        var x = a.last_updated;
                        var y = b.last_updated;
                        return ((x < y) ? 1 : ((x > y) ? -1 : 0));
                    }
                },
            sort_default: 'last_updated'
        }); });
    };
}(this));
