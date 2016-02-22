(function (env) {
    "use strict";
    env.ddg_spice_just_delete_me = function(api_result) {
        if (!api_result || api_result.length < 1) {
            return Spice.failed('just_delete_me');
        }
        var script = $('[src*="/js/spice/just_delete_me/"]')[0],
            source = $(script).attr("src"),
            query = source.match(/just_delete_me\/([^\/]+)/)[1],
            decodedQuery = decodeURIComponent(query).split(" ")[0].toLowerCase(),
            exact = api_result.find(function(item) { return item.name.toLowerCase() === decodedQuery}) ||
                    api_result.find(function(item) { return item.domains &&
                        ((typeof(item.domains) === "string" && item.domains.toLowerCase() === decodedQuery) ||
                         typeof(item.domains) === "object" && item.domains.some(function(domain) {return domain.toLowerCase() === decodedQuery}) )
                    }),
            api_result = exact ? [exact] : api_result.filter(function (item) {
                        item.domains =  !item.domains ? [] : typeof(item.domains) === "string" ? [item.domains] : item.domains;
                        if (item.name.toLowerCase().includes(decodedQuery) || item.domains.some(function(domain) {return domain.toLowerCase().includes(decodedQuery);}))
                            return true;
                        });

        if (!api_result || api_result.length < 1) {
            return Spice.failed('just_delete_me');
        }
        Spice.add({
            id: "JustDeleteMe",
            name: "Answer",
            meta: {
                sourceName: 'Just Delete Me',
                sourceUrl: "http://justdelete.me/#" + decodedQuery
            },
            data: api_result,
            normalize: function(item) {
                return {
                    delete_url: item.url,
                    title: item.name,
                    url: "http://justdelete.me/#" + decodedQuery,
                    subtitle: "Difficulty: " + DDG.capitalize(item.difficulty),
                    description: item.notes
                };
            },
            relevancy: {
                dup: 'name'
            },
            templates: {
                group: 'text',
                options: {
                    footer: Spice.just_delete_me.footer,
                    content: Spice.just_delete_me.content,
                    moreAt: true,
                    aux: false
                },
                variants: {
                    tileTitle: '1line-large',
                    tileFooter: '2line'
                },
                detail: api_result.length === 1 ? 'basic_info_detail' : false,
                item_detail: false
            }
        });
    };
}(this));
