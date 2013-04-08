function ddg_spice_bitly(response) {
	if (!response || !response.status_code === 200 || !response.data || !response.data.url) {
        return;
    }

    var template = "bitly";

    // Check if it is a mobile browser (needs work).
    if(window.navigator.userAgent.match(/Android|iPhone|iPad/i)) {
        template += "-mobile";
    }

    Spice.render({
        data             : response.data,
        header1          : 'Shortened URL (Bitly)',
        source_url       : response.data.url + "+",
        image_url        : response.data.url + '.qrcode?s=100',
        source_name      : 'Bit.ly',
        template_normal  : template,
        force_big_header : true
    });

    var selectText = function(url) {
        url.focus().select();
    };

    $(document).ready(function() {
        var url = $("input#bitly-url");
        selectText(url);
        url.on("click", function() {
            selectText(url);
        })
    });
}
