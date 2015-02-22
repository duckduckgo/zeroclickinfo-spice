(function (env) {
    "use strict";

    env.ddg_spice_people_in_space = function(api_result) {

        if (!api_result || api_result.number === undefined) {
          return Spice.failed('people_in_space');
        }

        if (api_result.number > 0) {
            DDG.require("moment.js", function() {
       	        var codes = {"canada":"ca","china":"cn", "denmark":"dk", "france":"fr", "germany":"de", "italy":"it", "japan":"jp", "netherlands":"nl", "russia":"ru", "spain":"sp", "sweden":"se", "uk":"uk", "usa":"us"};

                Spice.add({
                    id: "people_in_space",
                    name: "Answer",
                    data: api_result.people,
                    meta: {
                        itemType: (api_result.number === 1 ? "Person in Space" : "People in Space"),
                        sourceName: "People in Space",
                        sourceUrl: "http://www.howmanypeopleareinspacerightnow.com/"
                    },
                    normalize: function(item) {
                        return {
                            daysElapsed: moment().diff(item.launchdate, 'days'),
                            icon: DDG.settings.region.getLargeIconURL(codes[item.country.toLowerCase()]),
                            twitter: item.twitter.replace(/https?:\/\/twitter.com\//,'')
                        };
                    },
                    templates: {
                        item: 'base_item',
                        item_detail: Spice.people_in_space.detail,
                        options: {
                            content: Spice.people_in_space.content,
                        }
                    }
                });
         });
        } else {
            Spice.add({
                id: "people_in_space",
                name: "Answer",
                data: api_result,
                meta: {
                    sourceName: "People in Space",
                    sourceUrl: "http://www.howmanypeopleareinspacerightnow.com/"
                },
                normalize: function(item) {
                    return {
                        title: "There are no people in space right now.",
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