(function (env) {
    "use strict";
    env.ddg_spice_launchbug = function(api_result){

        if (!api_result || api_result.error) {
            return Spice.failed('launchbug');
        }
        
        DDG.require('moment.js', function() {
            
            var infoboxItems = {
                id: "Bug Id",
                can_expire: "Expires",
                information_type: "Type",
                message_count: "Comments on this Bug",
                heat: "Heat",
                date_created: "Date Created"
            };

            var infoboxData = [{
                heading: 'Bug Details'
            }];
            
            $.each(infoboxItems, function(key, value){
                if (api_result[key]){
                    if (key === "date_created") api_result[key] = moment(api_result[key]).format("MMMM D, YYYY");
                    infoboxData.push({
                        label: value,
                        value: api_result[key]
                    });
                }
            });

            Spice.add({
                id: "launchbug",
                name: "Launchpad",
                data: api_result,
                meta: {
                    sourceName: "Launchpad",
                    sourceUrl: api_result.web_link
                },
                normalize: function(item) {
                    return {
                        title: item.title,
                        subtitle: 'LaunchBug #' + item.id,
                        description: item.description,
                        infoboxData: infoboxData
                    };
                },
                templates: {
                    group: 'text',
                    options: {
                        content: Spice.launchbug.content,
                        moreAt: true
                    }
                }
            });
        });
    };
}(this));

