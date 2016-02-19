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
            decodedQuery = decodeURIComponent(query).split(" ")[0].toLowerCase()

        Spice.add({
            id: "just_delete_me",
            name: "Answer",
            meta: {
                sourceName: 'Just Delete Me',
                sourceUrl: "http://justdelete.me/#" + decodedQuery
            },
            data: api_result,
            normalize: function(item) {
                item.domains =  !item.domains ? [] : typeof(item.domains) === "string" ? [item.domains] : item.domains;
                if (!item.name.contains(decodedQuery) &&
                    !item.domains.some(function(domain) {return domain.contains(decodedQuery);}))
                    return null;

                item.exactMatch = (item.name && item.name.toLowerCase() === decodedQuery);
                item.boost = (item.domains.some(function(domain) {return domain === decodedQuery}));

                return {
                    delete_url: item.url,
                    title: "Delete your account on " + item.name,
                    url: "http://justdelete.me/#" + decodedQuery,
                    subtitle: "Difficulty: " + DDG.capitalize(item.difficulty),
                    description: item.notes
                };
            },
            relevancy: {
                dup: 'name'
            },
            templates: {
//                 detail: 'basic_info_detail',
//                 item: 'text_item',
                group: 'text',
                options: {
                    footer: Spice.just_delete_me.footer,
                    content: Spice.just_delete_me.content,
                    moreAt: true,
                    aux: false,
                    rating: false,
                    ratingText: false
                },
                variants: {
                    tileTitle: '2line-small',
                    tileSnippet: 'large',
                    tileFooter: '1line'
                },
//                 detail: false,
                item_detail: false // is there a way to disable item_detail without disabling detail?
            }
        });
    };
}(this));
