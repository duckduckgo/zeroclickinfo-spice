function ddg_spice_drinks(api_result) {
    "use strict";

    if(!api_result || api_result.length === 0 || !api_result[0].name) {
        return;
    }

    api_result[0].isArray = $.isArray(api_result[0].ingredients);

    Spice.render({
        data             : api_result[0],
        header1          : api_result[0].name + " (The Drink Project)",
        source_url       : api_result[0].url,
        source_name      : 'The Drink Project',
        spice_name       : 'drinks',
        template_frame   : "twopane",
        template_options: {
            left  : { template: "drinks" },
            right : { template: "drinks_ingredients" },
        },
        force_no_fold    : false
    });
}
