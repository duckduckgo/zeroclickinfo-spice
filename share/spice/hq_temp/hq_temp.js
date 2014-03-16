function ddg_spice_hq_temp(api_result) {
    "use strict";

    if (!api_result) {
        return;
    }

    Spice.render({
        data             : temperature,
        header1          : 'Temperature at ' + api_result.location,
        source_name      : 'Roberts Nifty Temperature Reader',
        source_url       : 'https://duckduckgo.com',
        template_normal  : 'hq_temp'
    });
}
