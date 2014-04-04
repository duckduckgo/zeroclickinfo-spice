function ddg_spice_expatistan(api_result) {
    if(!api_result || api_result.status !== 'OK') {
        return;
    }

    Spice.add({
        data             : api_result,
        sourceUrl       : api_result.sourceUrl,
        sourceName      : 'Expatistan',
        template_normal  : 'expatistan'
    });
}
