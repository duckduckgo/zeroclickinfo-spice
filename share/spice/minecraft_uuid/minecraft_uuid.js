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
        
        console.log(api_result);

        // Render the response
        Spice.add({
            id: 'minecraft_uuid',
            name: 'Minecraft',
            meta: {
                sourceName: 'Minecraft Username Converter',
                sourceUrl: 'https://mcuuid.net/?q=' + api_result.id
            },
            data: {
                uuid: addHyphens(api_result.id),
                name: api_result.name
            },
            templates: {
                group: 'text',
                options: {
                    title_content: Spice.minecraft_uuid.title_content,
                    moreAt: true
                }
            }
        });
    };
}(this));
