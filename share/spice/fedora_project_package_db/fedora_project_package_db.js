(function (env) {
    "use strict";

    env.ddg_spice_fedora_project_package_db = function (api_result) {

        // validate the response
        if (!api_result || api_result.error || api_result.output == 'notok' || !api_result.packages || !api_result.packages.length) {
            return Spice.failed('fedora_project_package_db');
        }

        // get search query
        var query = DDG.get_query().replace(/^.+?\s/, "").replace(/\*+$/, "") + "*";

        Spice.add({
            id: "fedora_project_package_db",
            name: "Software",
            data: api_result.packages,
            meta: {
                searchTerm: query,
                sourceName: "Fedora Project",
                sourceUrl: 'https://admin.fedoraproject.org/pkgdb/packages/' + query + '/'
            },
            templates: {
                group: 'text',
                detail: false,
                item_detail: false,
                options: {
                    footer: Spice.fedora_project_package_db.footer
                },
                variants: {
                    tileTitle: '1line',
                    tileSnippet: 'large',
                }
            },
            normalize: function (item) {
                return {
                    url: "https://admin.fedoraproject.org/pkgdb/package/" + item.name,
                    title: item.name,
                    altSubtitle: item.description ? item.summary : null,
                    description: item.description || item.summary
                };
            }
        });
    };
}(this));
