(function (env) {
    "use strict";
    env.ddg_spice_new_york_times = function(api_result) {

        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error) {
            return Spice.failed('new_york_times');
        }

        
        var script = $('[src*="/js/spice/new_york_times/"]')[0],
            source = $(script).attr("src"),
            query = source.match(/new_york_times\/([^\/]+)/)[1],
            decoded_query = decodeURIComponent(query);
        
        Spice.add({
            id: "new_york_times",

            name: "New York Times",
            data: api_result.results,
            meta: {
                sourceName: "New York Times",
                sourceUrl: api_result.copyright
            },
            normalize: function(item) {
                var title = item.title || "",
                    description = item.description || "",
                    contributor = item.contributor || "",
                    author = item.author || "",
                    publisher = item.publisher ;
                
                // Check relevancy of the item.
                // 1. Check if we have reviews (rated or unrated is fine).
                // 2. Check if the title + sub_title is relevant to the query.
                // 3. Check if the title is relevant to the query.
                // 4. Check if the title + author is relevant to the query.
                // 5. Check if the title + sub_title + author is relevant to the query.
                if(!((item.num_results) &&
                    (DDG.stringsRelevant(title + " " + description, decoded_query, [], 3) ||
                        DDG.stringsRelevant(title, decoded_query, [], 3) ||
                        DDG.stringsRelevant(title + " " + author, decoded_query, [], 3) ||
                        DDG.stringsRelevant(title + " " + description + " " + author, decoded_query, [], 3)))) {
                    return Spice.failed('new_york_times');
                }                
                
                
                return {
                    title: item.title,
                    description: item.description,
                    contributor: item.contributor,
                    author: item.author,
                    source: item.copyright
                };
            },
            templates: {
                group: 'text',
                options: {
                    content: Spice.new_york_times.content,
                    moreAt: true
                }
            }
        });
    };
}(this));
