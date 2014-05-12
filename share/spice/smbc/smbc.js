function ddg_spice_smbc(api_result) {
    "use strict";

    if(!api_result || !api_result.items || api_result.items < 2) {
        return;
    }

    Spice.add({
        data             : api_result,
        name: 'Comics',
        header1          : api_result.items[0].title + " (SMBC)",
        sourceUrl       : api_result.url,
        sourceName      : 'SMBC',
        templates: {
            item: Spice.smbc.smbc,
            detail: Spice.smbc.smbc
        },
        
    });
}
