(function (env) {
    "use strict";
    env.ddg_spice_passwd = function(api_result){

        if (api_result.error) {
            return Spice.failed('passwd');
        }

        Spice.add({
            id: "passwd",
            name: "Passwd",
            data: api_result,
            meta: {
                sourceName: "passwd.me",
                sourceUrl: 'http://passwd.me/'
            },
            templates: {
                group: 'base',
                options:{
                    content: Spice.passwd.content,
                    moreAt: true
                }
            }
        });
    };
}(this));
