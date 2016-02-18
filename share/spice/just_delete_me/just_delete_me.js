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
            decodedQuery = decodeURIComponent(query).split(" ")[0].toLowerCase();
        //         console.log("decodedQuery: " + decodedQuery);

        var isRelevantName = function(item) {
            if (!item.name)
                return false;
            if (item.name.toLowerCase().contains(decodedQuery))
                return true;   
            return false;
        };
        var isRelevantDomain = function(item) {
            if (!item.domains)
                return false;
            for (var i = 0; i<item.domains.length; i++)
                if (item.domains[i].toLowerCase().contains(decodedQuery))
                    return true;
            return false;
        };

        var short_list = api_result.filter(isRelevantName);
        if (short_list.length < 1) {            
            var short_list = api_result.filter(isRelevantDomain);
        }
        if (short_list.length < 1) {
            return Spice.failed('just_delete_me');
        }

        Spice.add({
            id: "just_delete_me",
            name: "Answer",
            meta: {
                sourceName: 'Just Delete Me',
                sourceUrl: "http://justdelete.me/#" + decodedQuery
            },
            data: short_list,
            normalize: function(item) {
                return {
                    delete_url: item.url,
                    title: "Delete your account on " + item.name,
                    url: "http://justdelete.me/#" + decodedQuery,
                    subtitle: "Difficulty: " + DDG.capitalize(item.difficulty),
                    description: item.notes
                };
            },
            templates: {
                detail: 'basic_info_detail',
                item: 'text_item',
                item_detail: false,
                variant: {
                    tileSnippet: 'small'
                },
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
