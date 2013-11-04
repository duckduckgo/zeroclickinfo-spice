function ddg_spice_alternative_to(api_result) {
    "use strict";

    if(!api_result || !api_result.Items || api_result.Items.length === 0) {
        return;
    }

    Spice.render({
        data                     : api_result,
        source_name              : 'AlternativeTo',
        source_url               : api_result.Url,
        spice_name               : 'alternative_to',
        more_icon_offset         : '-2px',
        template_frame           : "carousel",
        template_options         : {
            items                : api_result.Items,
            template_item        : "alternative_to",
            template_detail      : "alternative_to_details",
            li_height            : 65,
            single_item_handler  : function(obj) {            // gets called in the event of a single result
                obj.header1 = obj.data.Items[0].Name;         // set the header
                obj.image_url = obj.data.Items[0].IconUrl;    // set the image
            }
        },
    });
}
