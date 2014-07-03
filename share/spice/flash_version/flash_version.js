(function(env) {
    "use strict";

    env.ddg_spice_flash_version = function() {

    if(!FlashDetect) {
        return Spice.failed('flash_version');
    }

    // Display the plugin.
    Spice.add({
            data: {
        installed: FlashDetect.installed,
        raw: FlashDetect.raw
        },
        id: 'flash_version',
        name: 'Software',
        meta: {
        sourceName: 'Adobe',
        sourceUrl: 'https://get.adobe.com/flashplayer/',
        sourceIcon: true
        },
            templates: {
        group: 'base',
        options: {
            content: Spice.flash_version.content,
            moreAt: true
        }
            }
    });
    };
}(this));

ddg_spice_flash_version();
