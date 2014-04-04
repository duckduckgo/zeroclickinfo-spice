function ddg_spice_alternative_to(api_result) {
    "use strict";

    if(!api_result || !api_result.Items || api_result.Items.length === 0) {
        return;
    }

    Spice.add({
        data                     : api_result,
        sourceName              : 'AlternativeTo',
        sourceUrl               : api_result.Url,
        id               : 'alternative_to',
        
        view: "Tiles",
        templates         : {
            items                : api_result.Items,
            item: Spice.alternative_to.alternative_to,
            // detail: Spice.alternative_to.alternative_to_details, // testing with no detail
            li_height            : 65,
            single_item_handler  : function(obj) {            // gets called in the event of a single result
                obj.header1 = obj.data.Items[0].Name;         // set the header
                obj.image_url = obj.data.Items[0].IconUrl;    // set the image
            }
        },
    });
}
