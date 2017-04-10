(function (env) {
    "use strict";
    
    var addHyphens = function (str) {
        return str.substr(0, 8) + '-' + str.substr(8, 4) + '-' + str.substr(12, 4) + '-' + str.substr(16, 4) + '-' + str.substr(20, 12);
    }

    env.ddg_spice_minecraft_uuid = function(api_result) {

        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error || !api_result.id) {
            return Spice.failed('minecraft_uuid');
        }

        // Render the response
        Spice.add({
            id: 'minecraft_uuid',

            // Customize these properties
            name: 'Minecraft',
            data: api_result,
            meta: {
                sourceName: 'NameMC',
                sourceUrl: 'https://namemc.com/profile/' + api_result.id
            },
            normalize: function(item) {
                return {
                    // customize as needed for your chosen template
                    uuid: addHyphens(item.id),
                    name: item.name
                };
            },
            templates: {
                group: 'text',
                options: {
                    content: Spice.minecraft_uuid.content,
                    moreAt: true
                }
            }
        });
    };
}(this));
