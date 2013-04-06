function ddg_spice_bitly(response) {
	if (!response || !response.status_code === 200 || !response.data || !response.data.url) {
        return;
    }

    Spice.render({
        data             : { 'url' : response.data.url },
        header1          : 'Shortened URL (Bitly)',
        source_url       : 'http://bitly.com',
        image            : 'https://duckduckgo.com/iu/?u=http://i.imgur.com/xVpFr.png',
        source_name      : 'Bitly',
        template_normal  : 'bitly',
        force_big_header : true
    });

    $(document).ready(function() {
        var url = $("#bitly-url");

        // Load bootstrap.js. This shows the a tooltip that can guide the user.
        $.getScript("/bootstrap/bootstrap.js", function() {
            url.tooltip({
                placement: "right",
                trigger: "hover focus",
                title: "Copy"
            });
            url.focus();
            url.select();
        });
    });
}
