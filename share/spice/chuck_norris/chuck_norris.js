function ddg_spice_chuck_norris(api_result) {
    "use strict";

    if (api_result.type !== 'success') {
      return;
    }

    Spice.render({
        data             : api_result.value,
        source_url       : 'http://www.icndb.com',
        source_name      : 'Internet Chuck Norris Database',
        template_normal  : 'chuck_norris',
        force_no_icon    : true
    });
}
