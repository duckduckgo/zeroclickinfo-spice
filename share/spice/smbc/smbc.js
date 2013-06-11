function ddg_spice_smbc(api_result) {
    if(!api_result || !api_result.items || api_result.items < 2) {
        return;
    }

    Spice.render({
        data             : api_result,
        header1          : api_result.items[0].title + " (SMBC)",
        source_url       : api_result.url,
        source_name      : 'SMBC',
        template_normal  : 'smbc',
        force_big_header : true
    });
}
