function ddg_spice_smbc(api_result) {
    if(!api_result || !api_result.items || api_result.items < 2) {
        return;
    }

    Spice.add({
        data             : api_result,
        header1          : api_result.items[0].title + " (SMBC)",
        sourceUrl       : api_result.url,
        sourceName      : 'SMBC',
        template_normal  : 'smbc',
        
    });
}
