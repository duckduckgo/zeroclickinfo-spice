(function (env) {
    "use strict";
    env.ddg_spice_deb_version = function(api_result_str){
        var api_result = JSON.parse(api_result_str);

        if (api_result.error) {
            return Spice.failed('deb_version');
        }

        Spice.add({
            id: "deb_version",
            name: api_result.path + " Debian Package Versions",
            data: api_result,
            meta: {
                sourceName: "packages.debian.org",
                sourceUrl: 'https://packages.debian.org/search?searchon=names&keywords=' + api_result.path
            },
            normalize: function(result) {
                var data = {
                    record_data: {},
                    record_keys: ["squeeze", "squeeze-backports", "wheezy", "wheezy-backports", "jessie", "sid", "experimental"]
                };

                for (var i = result.versions.length - 1; i >= 0; i--) {
                    var version = result.versions[i];
                    console.log(version);

                    for (var j = version.suites.length - 1; j >= 0; j--) {
                        data.record_data[version.suites[j]] = version.version;
                    };
                };
                return data;
            },
            templates: {
                group: 'base',
                options: {
                    content: 'record',
                    /* optional - highlight alternate rows */
                    moreAt: true,
                }
            }
        });
    };
}(this));
