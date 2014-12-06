(function (env) {
    "use strict";
    env.ddg_spice_launchbug = function(api_result){

        if (!api_result || api_result.error) {
            return Spice.failed('launchbug');
        }

        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        dateObj = DDG.getDateFromString(api_result.date_created),
        CreDate = [months[dateObj.getMonth()], dateObj.getDate(), dateObj.getFullYear()];

        var uptObj = DDG.getDateFromString(api_result.date_last_updated),
        UptDate = [months[uptObj.getMonth()], uptObj.getDate(), uptObj.getFullYear()];

        var msgObj = DDG.getDateFromString(api_result.date_last_message),
        MsgDate = [months[msgObj.getMonth()], msgObj.getDate(), msgObj.getFullYear()];


        var infoboxItems = {
            id: "Bug Id",
            can_expire: "Expires",
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

        infoboxData.push({label: "Date Created", value: CreDate.join(' ')});
        infoboxData.push({label: "Last Update", value: UptDate.join(' ')});
        infoboxData.push({label: "Last Message", value: MsgDate.join(' ')});

        Spice.add({
            id: "launchbug",
            name: "Launchpad",
            data: api_result,
            meta: {
                sourceName: "Launchpad.com",
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
    };
}(this));
