(function(env) {
    "use strict";
    env.ddg_spice_clojars = function(api_result) {

        // Validate the response (customize for your Spice)
        var search_terms = DDG.get_query().split(" ");

        function keep_it(candidate) {
            return DDG.isRelevant(candidate, ['clojure', 'clojars', 'lib', 'library'], 1, 0);
        }

        var clojar_artifact = search_terms.filter(keep_it);

        if (!api_result || api_result.error) {
            return Spice.failed('clojars');
        }

        // Render the response
    
        Spice.add({
            id: "clojars",
            // Customize these properties
            name: 'On Clojars',
            data: api_result.results,

            meta: {
                search_term:clojar_artifact,
                sourceName: "clojars.org",
                sourceUrl: 'https://clojars.org/search?q=' + clojar_artifact
            },
            templates: {
                group: 'text',
                detail: false,
                item_detail: false,

                variants: {
                    tileTitle: 'basic4'                  
                }
            },
            normalize: function(item) {
                return {
                    title: item.group_name + "/" + item.jar_name,
                    subtitle: item.version,
                    url: "https://clojars.org/" + item.group_name + "/" + item.jar_name
                };
            }

        });
    };
}(this));