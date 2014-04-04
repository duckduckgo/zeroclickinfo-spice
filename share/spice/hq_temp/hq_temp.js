function ddg_spice_hq_temp(api_result) {
    if (!api_result) return;

    Spice.add({
        data             : temperature,
        header1          : 'Temperature at ' + api_result.location,
        sourceName      : 'Roberts Nifty Temperature Reader',
        sourceUrl       : 'https://duckduckgo.com',
        templates: {
            item: Spice.hq_temp.hq_temp,
            detail: Spice.hq_temp.hq_temp
        },
    });

}
