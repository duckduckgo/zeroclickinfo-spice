(function(env) {
    "use strict";

    env.ddg_spice_flash_version = function() {

	if(!FlashDetect) {
	    return;
	}

	// Display the plugin.
	Spice.add({
            data: {
		installed: FlashDetect.installed,
		raw: FlashDetect.raw
	    },
	    id: 'flash_version',
	    name: 'Flash Version',
	    meta: {
		sourceName: 'Adobe',
		sourceUrl: 'https://get.adobe.com/flashplayer/',
		sourceIcon: true
	    },
	    template_group: 'info',
            templates: {
		options: {
		    content: Spice.flash_version.content
		}
            }
	});
    };
}(this));

ddg_spice_flash_version();
