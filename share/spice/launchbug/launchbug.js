(function (env) {
    "use strict";
    env.ddg_spice_launchbug = function(api_result){

        if (api_result.error) {
            return Spice.failed('launchbug');
        }

        var infoboxItems = {
            id: "Bug Id",
            can_expire: "Expires",
            title: "Title",
            information_type: "Type",
            message_count: "Comments on this Bug",
            heat: "Heat"
        };

        var infoboxData = [{
            heading: 'Bug Details'
        }];

        $.each(infoboxItems, function(key, value){
            if (api_result[key]){
                infoboxData.push({
                    label: value,
                    value: api_result[key]
                });
            }
        });

        Spice.add({
            id: "launchbug",
            name: "About this Bug ...",
            data: api_result,
            meta: {
                sourceName: "Launchpad.com",
                sourceUrl: api_result.web_link
            },
            normalize: function(item) {
                return {
                    title: item.title,
                    infoboxData: infoboxData
                };
            },
            templates: {
                group: 'info',
                options: {
                    content: Spice.launchbug.content,
                    moreAt: true
                }
            }
        });
    };
}(this));
