function ddg_spice_flash_version () {

    // TODO: Probably better if we display all the plugins similar to https://www.mozilla.org/en-US/plugincheck/.
    // We can get that from window.navigator.plugins.
    var context = {
        version:  YAHOO.util.FlashDetect.raw,
    };

    if (!YAHOO.util.FlashDetect.installed){
        context.error = true;
    }

    // Display the plugin.
    Spice.add({
        data             : context,
        header1          : 'Flash Version',
        sourceName      : 'Adobe',
        sourceUrl       : 'https://get.adobe.com/flashplayer/',
        templates: {
            item: Spice.flash_version.flash_version,
            detail: Spice.flash_version.flash_version
        },
        
    });
}
ddg_spice_flash_version();