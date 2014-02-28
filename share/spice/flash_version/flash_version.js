function ddg_spice_flash_version () {
    "use strict";

    // TODO: Probably better if we display all the plugins similar to https://www.mozilla.org/en-US/plugincheck/.
    // We can get that from window.navigator.plugins.
    var context = {
        version:  YAHOO.util.FlashDetect.raw,
    };

    if (!YAHOO.util.FlashDetect.installed){
        context.error = true;
    }

    // Display the plugin.
    Spice.render({
        data             : context,
        header1          : 'Flash Version',
        source_name      : 'Adobe',
        source_url       : 'https://get.adobe.com/flashplayer/',
        template_normal  : 'flash_version',
        force_big_header : true
    });
}
ddg_spice_flash_version();
