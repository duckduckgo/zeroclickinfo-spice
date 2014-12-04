(function (env) {
    "use strict";
    env.ddg_spice_launchbug = function(api_result){

        // Validate the response (customize for your Spice)
        if (api_result.error) {
            return Spice.failed('launchbug');
        }

        //var date_created = api_result.date_created.substring(0,10);

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

        // Render the response
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
