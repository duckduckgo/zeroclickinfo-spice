function ddg_spice_hq_temp(response) {
    if (!response) return;

    var temperature      = [];
    temperature.value    = response.temp.replace(/^0*/,'');
    temperature.units    = response.unit;
    temperature.location = response.location;

	nra(items);
    Spice.render({
        data             : temperature,
        header1          : 'Temperature at ' + response.location,
        source_name      : 'Roberts Nifty Temperature Reader',
        source_url       : 'https://duckduckgo.com',
        template_normal  : 'hq_temp',
    });

}
