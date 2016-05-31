(function (env) {
    "use strict";
    env.ddg_spice_rfc = function(api_result) {

        if (!api_result || api_result.error || api_result.message == "no results.") {
            return Spice.failed('request_for_comments');
        }

        Spice.add({
            id: "request_for_comments",
            name: "Answer",
            data: api_result,
            meta: {
                sourceName: "RFC Search"
            },
            normalize: function(item) {
                return {
                    title: item.title,
                    altSubtitle: item.authors,
                    description: item.moreinfo,
                    url: item.link,
                    number: item.number,
                    date: item.date
                };
            },
            templates: {
                group: 'text',
                detail: false,
                item_detail: false,
                options: {
                    moreAt: false,
                    footer: Spice.rfc.footer
                },
                variants: {
                    tile: 'wide',
                    tileTitle: '3line-small',
                    tileSnippet: 'small',
                    tileFooter: '2line'
                }
            }
        });
    };
}(this));
