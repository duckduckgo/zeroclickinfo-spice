(function(env) {
    "use strict";
    env.ddg_spice_clojure_packages_from_clojars = function(api_result) {

        // Validate the response (customize for your Spice)
        var search_terms = DDG.get_query().split(" ");

        function keep_it(candidate) {
            return DDG.isRelevant(candidate, ['clojure', 'clojars', 'lib', 'library'], 1, 0);
        }

        var clojar_artifact = search_terms.filter(keep_it);

        if (!api_result || api_result.error) {
            return Spice.failed('clojure_packages_from_clojars');
        }

        // Render the response
        Spice.add({
            id: "clojure_packages_from_clojars",
            // Customize these properties
            name: "\"" + clojar_artifact + "\"" + ' on Clojars',
            data: api_result.results,

            meta: {
                sourceName: "clojars.org",
                sourceUrl: 'https://clojars.org/search?q=' + clojar_artifact
            },
            templates: {
                group: 'text',
                detail: false,
                item_detail: false,

                variants: {
                    tileTitle: 'basic4',
                    detail: 'light'
                }
            },
            normalize: function(item) {
                return {
                    title: item.group_name + "/" + item.jar_name,
                    subtitle: item.version,
                    description: item.description,
                    url: "https://clojars.org/" + item.group_name + "/" + item.jar_name

                };
            }

        });
    };
}(this));