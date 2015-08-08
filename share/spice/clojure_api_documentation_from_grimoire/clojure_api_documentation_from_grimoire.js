(function (env) {
    "use strict";
    env.ddg_spice_clojure_api_documentation_from_grimoire = function(api_result){

        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error) {
            return Spice.failed('clojure_api_documentation_from_grimoire');
        }

        // Render the response
        Spice.add({
            id: "clojure_api_documentation_from_grimoire",
            // Customize these properties
            name: api_result.body.ns + "/" + api_result.body.name + " on Grimoire",
            data: api_result.body,
            meta: {
                sourceName: "conj.io",
                sourceUrl: 'http://conj.io/store/v1/org.clojure/clojure/1.7.0/clj/' + api_result.body.ns+'/' 
                            + api_result.body.name
            },
            templates: {
                group: 'text',
                options: {
                    content: Spice.clojure_api_documentation_from_grimoire.content,
                    moreAt: true
                }
            }
        });
    };
}(this));
