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
                    description: item.notes,
                };
            },
            templates: {
                item: 'text_item',
                detail: 'basic_info_detail',
                options: {
		            content: Spice.justdeleteme.jdm_item_detail,
                    moreAt: true,
                    aux: false
                }
            }
        });
    };
}(this));
