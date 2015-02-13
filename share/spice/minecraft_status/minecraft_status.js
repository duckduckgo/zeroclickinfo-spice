(function (env) {
    'use strict';
    env.ddg_spice_minecraft_status = function(api_result) {
        
        if (!api_result) {
            return Spice.failed('minecraft_status');
        }

        Spice.add({
            id: 'minecraft_status',
            name: 'Status',
            data: api_result,
            meta: {
                sourceName: 'Mojang Support',
                sourceUrl: 'https://help.mojang.com/',
                sourceIconUrl: 'https://help.mojang.com/customer/portal/theme_attachments/15570?cb=1387305064636'
            },
            templates: {
                group: 'base',
                options:{
                    content: Spice.minecraft_status.content,
                    moreAt: true
                }
            }
        });
    }

    Spice.registerHelper('MinecraftStatus_ifCond', function(string1, string2, options) {
        return ((string1 === string2) ? options.fn(this) : options.inverse(this));
    });
}(this));
