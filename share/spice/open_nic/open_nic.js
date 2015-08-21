(function (env) {
    "use strict";
    env.ddg_spice_open_nic = function(api_result){

        if (!api_result) {
            return Spice.failed('open_nic');
        }

        Spice.add({
            id: "open_nic",
            name: "DNS",
            data: {
                list: api_result
            },
            meta: {
                sourceName: "OpenNIC",
                sourceUrl: 'https://api.opennicproject.org/geoip/'
            },
            templates: {
                group: 'list',
                options: {
                    list_content: Spice.open_nic.content,
                    moreAt: true
                }
            }
        });
    };
}(this));
