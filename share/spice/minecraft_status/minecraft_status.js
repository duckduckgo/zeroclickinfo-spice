(function (env) {
    'use strict';
    env.ddg_spice_minecraft_status = function(api_result) {
        
        if (!api_result) {
            return Spice.failed('minecraft_status');
        }     
        
        var green = [];
        var yellow = [];
        var red = [];        
        
        for (var i = 0; i < api_result.length; i++) {
            var service = api_result[i];
            var status = Object.keys(service)[1];
            var name = Object.keys(service)[0];

            switch(status) {
                case 'green':
                    green.push(name);
                    break;
                case 'yellow':
                    yellow.push(name);
                    break;
                case 'red':
                    red.push(name);
                    break;
            }
        } 
        
        var status = good;
        
        if(red.length >= 1) {
            status = 'major';
        } else if(yellow.length >= 1) {
            status = 'minor';
        }

        Spice.add({
            id: 'minecraft_status',
            name: 'Status',
            data: {
                status: status
            },
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
