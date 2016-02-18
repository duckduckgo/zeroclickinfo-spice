(function (env) {
    "use strict";
    env.ddg_spice_just_delete_me = function(api_result) {
        if (!api_result || api_result.length < 1) {
            return Spice.failed('just_delete_me');
        }

        // get the remainder
        var script = $('[src*="/js/spice/just_delete_me/"]')[0],
            source = $(script).attr("src"),
            query = source.match(/just_delete_me\/([^\/]+)/)[1],
            decodedQuery = decodeURIComponent(query).split(" ")[0].toLowerCase(),
            query_regexp = new RegExp(".*" + decodedQuery + ".*", 'i');
        
        Spice.add({
            id: "just_delete_me",
            name: "Answer",
            meta: {
                sourceName: 'Just Delete Me',
                sourceUrl: "http://justdelete.me/#" + decodedQuery
            },
            data: api_result,
            normalize: function(item) {
                if (!item.domains) item.domains = [];
                return {
                    delete_url: item.url,
                    domain: item.domains.join(),
                    title: "Delete your account on " + item.name,
                    url: "http://justdelete.me/#" + decodedQuery,
                    subtitle: "Difficulty: " + DDG.capitalize(item.difficulty),
                    description: item.notes
                };
            },
            relevancy: {
                primary: [
                    {required: 'name'},
                    {key: 'name', match: query_regexp },
                    {key: 'domain' } // Never relevant.
                ]
            },
            templates: {
                detail: 'basic_info_detail',
                item: 'text_item',
                item_detail: false,
                options: {
                    footer: Spice.just_delete_me.jdm_footer,
                    content: Spice.just_delete_me.jdm_item_detail,
                    moreAt: true,
                    aux: false
                }
            }
        });
    };
}(this));
