(function (env) {
    "use strict";
    env.ddg_spice_launch_library = function(api_result){

        // If the response failed on the server, don't render the Instant Answer at all
        if (!api_result || api_result.status == "fail" || api_result.total === undefined) {
            return Spice.failed('launch_library');
        }

        if (api_result.total > 0) {
            DDG.require("moment.js", function() {
                Spice.add({
                    id: "launch_library",

                    name: "Answer",
                    data: api_result.launches,
                    meta: {
                        itemType: (api_result.number === 1 ? "Upcoming Launch" : "Upcoming Launches"),
                        sourceName: "Launch Library",
                        sourceUrl: 'http://launchlibrary.net/'
                    },
                    normalize: function(item) {
                        return {
                            title: item.name,
                            subtitle: moment(item.net).format("MMM DD, YYYY"),
                            url: item.vidURL,
                            description: "Launching from " + item.location.pads[0].name
                            
                        };
                    },
                    templates: {
                        group: 'text',
                        detail: false,
                        item_detail: false,
                        options: {
                            footer: Spice.launch_library.footer,
                            moreAt: true
                        },
                        variants: {
                            tileTitle: '2line',
                            tileSnippet: 'large'
                        }
                    }
                });
            });
        } else {
            // If there aren't any launches scheduled, render the Instant Answer with a default message
            Spice.add({
                id: "launch_library",
                name: "Answer",
                data: api_result,
                meta: {
                    sourceName: "LaunchLibrary.net",
                    sourceUrl: "http://launchlibrary.net/"
                },
                normalize: function(item) {
                    return {
                        title: "There are no launches scheduled.",
                    };
                },
                templates: {
                    group: "text",
                    options:{
                        moreAt: true
                    }
                }
            });
           
        }
        
    };
}(this));
