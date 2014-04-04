function ddg_spice_chuck_norris(api_result) {
    if (api_result.type !== 'success') return;

    Spice.add({
        data             : api_result.value,
        sourceUrl       : 'http://www.icndb.com',
        sourceName      : 'Internet Chuck Norris Database',
        templates: {
            item: Spice.chuck_norris.chuck_norris,
            detail: Spice.chuck_norris.chuck_norris
        },
        
    });
}

