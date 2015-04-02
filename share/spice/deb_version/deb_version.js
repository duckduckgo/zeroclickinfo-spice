(function (env) {
    "use strict";
    env.ddg_spice_deb_version = function(api_result){
        if (!api_result || api_result.error) {
            return Spice.failed('deb_version');
        }

        Spice.add({
            id: "deb_version",
            name: "Software",
            data: api_result,
            meta: {
                sourceName: "packages.debian.org",
                sourceUrl: 'https://packages.debian.org/search?searchon=names&keywords=' + api_result.package
            },
            normalize: function(result) {
                var data = {
                    title: result.package,
                    subtitle: "Debian Package Versions",
                    record_data: {},
                };

                for (var i = result.versions.length - 1; i >= 0; i--) {
                    var version = result.versions[i];

                    for (var j = version.suites.length - 1; j >= 0; j--) {
                        data.record_data[version.suites[j]] = version.version;
                    };
                };

                if (Object.keys(data.record_data).length === 0) {
                    return Spice.failed('deb_version');
                }

                return data;
            },
            templates: {
                group: 'text',
                options: {
                    content: 'record',
                    moreAt: true,
                }
            }
        });
    };
}(this));
