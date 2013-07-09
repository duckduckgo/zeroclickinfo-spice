function ddg_spice_alternative_to(api_result) {
    "use strict";

    if(!api_result || !api_result.Items || api_result.Items.length === 0) {
        return;
    }

    Spice.render({
        data                     : api_result,
        source_name              : 'AlternativeTo',
        source_url               : api_result.Url,
        template_normal          : "alternative_to",
        template_frame           : "carousel",
        carousel_template_detail : "alternative_to_details",
        carousel_css_id          : "alternative_to",
        carousel_items           : api_result.Items,
        template_options         : { li_height : 60 }
    });
}