function ddg_spice_alternative_to(api_result) {
    "use strict";

    if(!api_result || !api_result.Items || api_result.Items.length === 0) {
        return;
    }

    console.log(api_result);
    Spice.add({
        data                     : api_result.Items,
        sourceName              : 'AlternativeTo',
        sourceUrl               : api_result.Url,
        id               : 'alternative_to',
        templates         : {
            item: Spice.alternative_to.alternative_to,
        },
    });
}
