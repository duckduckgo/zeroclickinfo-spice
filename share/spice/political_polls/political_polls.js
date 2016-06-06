(function (env) {
    "use strict";
    env.ddg_spice_political_polls = function(api_result){

        // Validate the response (customize for your Spice)
        if (!api_result || api_result.length == 0 || api_result.error) {
            return Spice.failed('political_polls');
        }
        

        // Render the response
        DDG.require("moment.js", function() {
            Spice.add({
                id: "political_polls",

                // Customize these properties
                name: "Polls",
                data: api_result,
                meta: {
                    sourceName: "HuffPost Pollster",
                    sourceUrl: 'http://elections.huffingtonpost.com/pollster',
                },
                templates: {
                    group: 'text',
                    detail: false,
                    item_detail: false,
                    options: {
                        footer: Spice.political_polls.footer,
                    },
                    variants: {
                        tileSnippet: "large"
                    }
                },
                normalize: function(item) {
                    var itemDescription = "";
                    for(var k = 0; (k < item.estimates.length && k < 3); k++){ //show max 3
                        var estimate = item.estimates[k];
                        itemDescription += estimate.choice;
                        if(estimate.party !== "N/A" && estimate.party !== null){
                            itemDescription += (" (" + estimate.party.toUpperCase() + ")");
                        }
                        itemDescription += (" at " + estimate.value + "%");
                        if(k < item.estimates.length - 1 && k < 2){
                            itemDescription += ", ";
                        }
                    }
                     return {
                         title: item.title,
                         subtitle: item.poll_count + " polls",
                         url: item.url,
                         description: itemDescription,
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
            });
        });
    };
}(this));
