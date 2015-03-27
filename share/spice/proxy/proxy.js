(function (env) {
    "use strict";
    env.ddg_spice_proxy = function(api_result){

        if (!api_result || api_result.error) {
            return Spice.failed('proxy');
        }

        var many = api_result.general.countlist;
        var baseAdd;
        var proxy = [];

        // fill object
        for (var i = 1; i < many+1; i++) {
            baseAdd = api_result.proxylist['list-'+i];

            proxy.push({
                ip: baseAdd.ip,
                port: baseAdd.port,
                country: baseAdd.country,
                anon: baseAdd.anonymouslevel,
                speed: baseAdd.proxyspeed,
                date: baseAdd.date
            });
        }


        Spice.add({
            id: "proxy",
            name: "Proxy",
            data: proxy,
            meta: {
                sourceName: 'Yasakvar.com',
                sourceUrl: 'http://www.yasakvar.com/'
            },
            templates: {
                group: 'base',
                detail: false,
                options: {
                    content: Spice.proxy.content,
                    moreAt: false
                }
            }
        });
    };
}(this));
