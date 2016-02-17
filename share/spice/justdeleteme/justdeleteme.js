(function (env) {
    "use strict";
    env.ddg_spice_justdeleteme = function(api_result) {
        if (!api_result || api_result.length < 1) {
            return Spice.failed('justdeleteme');
        }
        
        // get the remainder
        var script = $('[src*="/js/spice/justdeleteme/"]')[0],
        source = $(script).attr("src"),
        query = source.match(/justdeleteme\/([^\/]+)/)[1],
        decodedQuery = decodeURIComponent(query).toLowerCase();
        console.log("decodedQuery: " + decodedQuery);

        var isRelevantName = function(item) {
            if (!item.name)
                return false;
            if (!decodedQuery.includes("justin") && item.name.toLowerCase().includes("justin"))
                return false;
            if (DDG.isRelevant(item.name))
                return true;        
            return false;
        }
        var isRelevantDomain = function(item) {
            for (var domain in item.domains) {
                if (!decodedQuery.includes("justin") && domain.toLowerCase().includes("justin"))
                    continue;
                if (DDG.isRelevant(domain))
                    return true;
            }            
            return false;
        }
        
        var short_list = api_result.filter(isRelevantName);
         if (short_list.length < 1) {            
             var short_list = api_result.filter(isRelevantDomain);
         }
        if (short_list.length < 1) {
            return Spice.failed('justdeleteme');
        }
        // Render the response
        Spice.add({
            id: "justdeleteme",

            // Customize these properties
            name: "Reference",
            meta: {
                sourceName: 'Just Delete Me',
                sourceUrl: "http://justdelete.me/#" + decodedQuery
            },
            data: short_list,
            normalize: function(item) {
                return {                    
                    title: "Delete your account on " + item.name,
                    url: item.url,
                    subtitle: "Difficulty: " + DDG.capitalize(item.difficulty),
                    description: item.notes
                };
            },
            templates: {
                item: 'text_item',
                detail: 'basic_info_detail',
                options: {
                    moreAt: true,
                    aux: false
                }
            }
        });
    };
}(this));
