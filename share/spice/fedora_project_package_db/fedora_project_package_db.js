(function (env) {
    "use strict";

    env.ddg_spice_fedora_project_package_db = function (api_result) {

        // validate the response
        if (api_result.error || api_result.output == 'notok' || !api_result.packages || !api_result.packages.length) {
            return Spice.failed('fedora_project_package_db');
        }

        // limit results to first 30 entries
        if (api_result.packages.length > 30) api_result.packages = api_result.packages.splice(0, 30);

        // get search query
        var query = DDG.get_query().replace(/^.+?\s/, "").replace(/\*+$/, "") + "*";

        Spice.add({
            id: "fedora_project_package_db",
            name: "Software",
            data: api_result.packages,
            meta: {
                sourceName: "FedoraProject.org",
                sourceUrl: 'https://admin.fedoraproject.org/pkgdb/packages/' + query + '/'
            },
            templates: {
                group: 'text',
                detail: false,
                item_detail: false,
                options: {
                    footer: Spice.fedora_project_package_db.footer
                }
            },
            normalize: function (item) {
                var res = {
                    url: "https://admin.fedoraproject.org/pkgdb/package/" + item.name,
                    title: item.name,
                    subtitle: item.summary,
                    description: item.description,
                };

                if (!res.description) {
                    res.description = item.summary;
                    res.subtitle = "";
                }

                return res;
            }
        });
    };
}(this));
