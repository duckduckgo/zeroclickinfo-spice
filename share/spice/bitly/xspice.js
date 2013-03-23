function ddg_spice_bitly(response) {
    console.log(response);
	if (!response || !response.status_code === 200
            || !response.data || !response.data.url) return;
    Spice.render({
        data             : { 'url' : response.data.url },
        header1          : 'Shortened URL (Bitly)',
        source_url       : 'http://bitly.com',
        image            : 'http://i.imgur.com/xVpFr.png',
        source_name      : 'Bitly',
        template_normal  : 'bitly',
        force_big_header : true
    });
}
