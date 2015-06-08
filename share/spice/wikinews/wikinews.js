(function (env) {
    "use strict";
    env.ddg_spice_wikinews = function(api_result){

        if (api_result.error) {
            return Spice.failed('wikinews');
        }

        DDG.require('moment.js', function(){
            Spice.add({
                id: "wikinews",
                name: "Wikinews",
                data: api_result.query.categorymembers,
                meta: {
                    total: api_result.query.categorymembers.length,
                    sourceName: 'Wikinews articles',
                    sourceUrl: "https://en.wikinews.org/wiki/Main_Page",
                    itemType: "Latest Wikinews articles"
                },
                normalize: function(item) {
                    var timestamp = new Date(item.timestamp).getTime();

                    return {
                        title: item.title,
                        url: "https:///en.wikinews.org/?curid=" + item.pageid,
                        post_domain: "wikinews.org",
                        date_from: moment(timestamp).fromNow()
                    };
                },
                templates: {
                    group: 'text',
                    options: {
                        footer: Spice.wikinews.footer
                    },
                    detail: false,
                    item_detail: false,
                    variants: {
                        tileTitle: "4line",
                    },
                    elClass: {
                        tileTitle: 'tx--17'
                    }
                }
            });
        });
    };
}(this));
