function ddg_spice_chuck_norris(api_result) {
    if (api_result.type !== 'success') return;

    Spice.add({
        data             : api_result.value,
        sourceUrl       : 'http://www.icndb.com',
        sourceName      : 'Internet Chuck Norris Database',
        template_normal  : 'chuck_norris',
        
    });
}

