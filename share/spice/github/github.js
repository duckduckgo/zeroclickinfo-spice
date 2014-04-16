(function(env) {    
    env.ddg_spice_github = function(api_result) {
        "use strict";

        if (!api_result || !api_result.meta.status === '200') {
          return;
        }

        var query = DDG.get_query()
                    .replace(/^\s*github\s+/, "");

        var results = api_result.data.repositories;

        Spice.add({
            id: "gihub",
            name: "Github",
            data: results,
            meta: {
                total: results.length,
                itemType: query + " (GitHub)",
                sourceUrl: 'http://www.github.com/search?q=' +  encodeURIComponent(query),
                sourceName: 'GitHub',
            },
            templates: {
                item: Spice.github.item
            }
        });
    }
}(this));
