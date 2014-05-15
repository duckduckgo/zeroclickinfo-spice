(function(env) {    
    env.ddg_spice_thesaurus = function(api_result) {
        "use strict";

        if (!api_result){
            return Spice.failed("thesaurus");
        }

        // Get the query and the mode (trigger words)
        // The mode tells us what to return
        // e.g. you want the antonym but not the synonym
        var script = $('[src*="/js/spice/thesaurus/"]')[0],
            source = $(script).attr("src"),
            match  = source.match(/\/js\/spice\/thesaurus\/([^\/]+)\/([^\/]+)/),
            query  = match[1],
            mode   = match[2];

        var shorthand = {
            "synonyms"  : "syn",
            "synonym"   : "syn",
            "antonyms"  : "ant",
            "antonym"   : "ant",
            "related"   : "rel",
            "similar"   : "sim",
            "thesaurus" : "syn"
        };

        var headers = {
            "syn" : "Synonyms of ",
            "ant" : "Antonyms of ",
            "rel" : "Related to ",
            "sim" : "Similar to "
        };

        // Check if the mode exists.
        var how_many = 0;
        for(var i in api_result) {
            if(api_result.hasOwnProperty(i) && (shorthand[mode] in api_result[i])) {
                how_many += 1;
            }
        }
        if(how_many === 0) {
            return Spice.failed('theasaurus');
        }

        api_result.mode = shorthand[mode];

        // Create the plugin.
        Spice.add({
            id: 'thesaurus',
            name: 'Thesaurus',
            data:  api_result,
            normalize: function(item){
                var res = {
                    headerText: headers[item.mode] || 'Thesaurus: ',
                    query: query,
                    results: []
                };

                for(var parts_of_speech in item) {
                    if(item.hasOwnProperty(parts_of_speech) && item[parts_of_speech][item.mode]) {
                        res.results.push({
                            heading : parts_of_speech.charAt(0).toUpperCase() + parts_of_speech.slice(1),
                            words   : item[parts_of_speech][item.mode].splice(0, 10).join(", ")
                        });
                    }
                }

                return res;
            },
            meta: {
                sourceName:  'Big Huge Thesaurus',
                sourceUrl:  'http://words.bighugelabs.com/' + query,
            },
            templates: {
                group: 'text',
                detail: false,
                item_detail: false,
                options: {
                    content: Spice.thesaurus.content,
		    title_content: Spice.thesaurus.title_content,
                    moreAt: true
                }
            }
        });
    }
}(this));
