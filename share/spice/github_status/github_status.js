(function(env) {
    "use strict";
    env.ddg_spice_github_status = function(api_result) {
        if (api_result.error) {
            return Spice.failed('github_status');
        }
        switch (api_result.status) {
            case "good": api_result.color = "green"; break;
            case "minor": api_result.color = "yellow"; break;
            case "major": api_result.color = "red"; break;
        }
        api_result.status = api_result.status.charAt(0).toUpperCase() + api_result.status.substr(1);
        Spice.add({
            id: "github_status",
            name: "Github Status",
            data: api_result,
            meta: {
                sourceName: "Github",
                sourceUrl: "https://status.github.com/",
            },
            templates: {
                group: "base",
                options: {
                    content: Spice.github_status.content,
                    moreAt: true,
                }
            }
        });
    };
})(this);
