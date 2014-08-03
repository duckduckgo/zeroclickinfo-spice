(function (env) {
    "use strict";
    env.ddg_spice_github_status = function(api_result) {
        
        if (api_result.error) {
            return Spice.failed('github_status');
        }

        Spice.add({
            id: "github_status",
            name: "Status",
            data: api_result,
            meta: {
                sourceName: "GitHub",
                sourceUrl: "https://status.github.com/",
            },
            templates: {
                group: 'base',
                options:{
                    content: Spice.github_status.content,
                    moreAt: true
                }
            }
        });
    };
}(this));
