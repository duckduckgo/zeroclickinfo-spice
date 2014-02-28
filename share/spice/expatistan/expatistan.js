function ddg_spice_expatistan(api_result) {
    "use strict";

    if(!api_result || api_result.status !== 'OK') {
        return;
    }

    Spice.render({
        data             : api_result,
        source_url       : api_result.source_url,
        source_name      : 'Expatistan',
        template_normal  : 'expatistan'
    });
}
