function ddg_spice_expatistan(api_result) {
    "use strict";

    if(!api_result || api_result.status !== 'OK') {
        return;
    }

    Spice.add({
        data             : api_result,
        sourceUrl       : api_result.sourceUrl,
        sourceName      : 'Expatistan',
        templates: {
            item: Spice.expatistan.expatistan,
            detail: Spice.expatistan.expatistan
        }
    });
}
