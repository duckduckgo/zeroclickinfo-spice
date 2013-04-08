// TODO: Probably better if we display all the plugins similar to https://www.mozilla.org/en-US/plugincheck/.
// We can get that from window.navigator.plugins.
var ddg_spice_flash_version = function() {
    var context = {version: "You're using " + YAHOO.util.FlashDetect.raw};

    // Check if Flash was detected.
    if(!YAHOO.util.FlashDetect.installed) {
        context.version = "You don't have Flash installed"
    } 

    // Display the plugin.
    Spice.render({
        data             : context,
        header1          : 'Flash Version',
        source_name      : 'Adobe',
        source_url       : 'https://get.adobe.com/flashplayer/',
        template_normal  : 'flash',
        force_big_header : true
    }); 
};

// Manually call the function.
ddg_spice_flash_version();