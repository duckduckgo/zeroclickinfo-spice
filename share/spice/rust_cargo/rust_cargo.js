(function (env) {
    "use strict";
    env.ddg_spice_rust_cargo = function(api_result){

        if (!api_result || !api_result.crates) {
            return Spice.failed('rust_cargo');
        }
        var crates = api_result.crates;
        
        var query = DDG.get_query().replace(/(cargo|rust) (package|crate|cargo)(s)?/, "").trim();
        
        DDG.require("moment.js", function() {
            Spice.add({
                id: "rust_cargo",
                name: "Software",
                data: crates,
                meta: {
                    itemType: "Cargo crates",
                    searchTerm: query,
                    sourceName: "Cargo",
                    sourceUrl: 'https://crates.io/search?q=' + encodeURIComponent(query)
                },
                normalize: function(item) {
                    return {
                        title: item.name + " " + item.max_version,
                        subtitle: "Last updated " + moment(item.updated_at).fromNow(),
                        description: item.description,
                        url: "https://crates.io/crates/" + encodeURIComponent(item.id),
                        abbrevDownloads: DDG.abbrevNumber(item.downloads)
                    }  
                },

                templates: {
                    group: 'text',
                    detail: false,
                    item_detail: false,
                    options: {
                        footer: Spice.rust_cargo.footer
                    },
                    variants: {
                        tile: 'basic4'
                    }
                },
                sort_fields: {
                    downloads: function(a, b) {
                        return a.downloads > b.downloads ? -1 : 1;
                    }
                },
                sort_default: 'downloads'
            });
        });
    };
}(this));
