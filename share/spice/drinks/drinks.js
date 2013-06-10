function ddg_spice_drinks(api_result) {
    "use strict";

    if(!api_result || api_result.length === 0 || !api_result[0].name) {
        return;
    }

    if($.isArray(api_result[0].ingredients)) {
        api_result[0].isArray = true;
    } else {
        api_result[0].isArray = false;
    }

    Spice.render({
        data             : api_result[0],
        header1          : api_result[0].name + " (The Drink Project)",
        source_url       : api_result[0].url,
        source_name      : 'The Drink Project',
        template_normal  : 'drinks',
        force_no_fold    : true
    });
}