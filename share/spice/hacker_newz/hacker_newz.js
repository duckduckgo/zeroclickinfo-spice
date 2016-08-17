(function (env) {
    "use strict";

    env.ddg_spice_hacker_newz = function(api_result) {

        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error || api_result.hits.length === 0) {
            return Spice.failed('hacker_newz');
        }

        Spice.add({
            id: 'hacker_newz',

            name: 'Social',
            data: api_result.hits,
            meta: {
                sourceName: 'HNZ Search',
                total: api_result.hits,
                itemType: (api_result.hits.length === 1) ? 'Hacker Newz submission' : 'Hacker Newz submissions'
            },
            normalize: function(item) {
                return {
                    title: item.title,
                    url: (item.url) ? item.url : 'https://news.ycombinator.com/item?id=' + item.objectID,
                    points: item.points || 0,
                    num_comments: item.num_comments || 0
                };
            },
            templates: {
                group: 'text',
                options: {
                    footer: Spice.hacker_newz.footer
                },
                detail: false,
                item_detail: false,
                variants: {
                    tileTitle: "3line-small",
                    tileFooter: "3line"
                },
                sort_fields: {
                score: function(a, b){
                    return (a.points > b.points) ? -1 : 1;
                },
                date: function(a, b){
                   return (a.created_at_i > b.created_at_i) ? -1 : 1;
                }
            },
sort_default: 'score'
            },
        });
    };
}(this));
