(function (env) {
    "use strict";
    env.ddg_spice_sublime_packages = function(api_result){

        if (!api_result || api_result.error || api_result.packages.length == 0) {
            return Spice.failed('sublime_packages');
        }

        DDG.require('moment.js', function() {
                Spice.add({
                    id: "sublime_packages",
                    name: "Software",
                    data: api_result.packages,
                    meta: {
                        itemType: "Sublime Text Packages",
                        sourceName: "packagecontrol.io",
                        sourceUrl: 'http://packagecontrol.io' + api_result.name
                    },
                    normalize: function(item) {
                        // Skip returning items with no description
                        if (item.highlighted_description == "No description provided") {
                            return null;
                        }
                        return {
                            title: item.name,
                            subtitle: item.highlighted_authors,
                            last_modified: moment(item.last_modified).fromNow(),
                            description: item.highlighted_description,
                            url: "https://packagecontrol.io/packages/" + item.name
                        };
                    },
                    templates: {
                        group: 'text',
                        detail: false,
                        item_detail: false,
                        options: {
                            footer: Spice.sublime_packages.footer
                        },
                        variants: {
                            tile: 'basic4'
                        }
                    },
                    // Sort by number of unique installs
                    sort_fields: {
                        unique_installs: function(a, b) {
                            var x = a.unique_installs;
                            var y = b.unique_installs;
                            return ((x < y) ? 1 : ((x > y) ? -1 : 0));
                        }
                    },
                    sort_default: 'unique_installs'
                });
            });
        };
}(this));
