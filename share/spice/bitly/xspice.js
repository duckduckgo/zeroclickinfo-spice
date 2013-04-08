function ddg_spice_bitly(response) {

    // Exit immediately if we find an error message.
    if (!response || !response.status_code === 200 || !response.data || !response.data.url) {
        return;
    }


    // Check if it is a mobile browser (needs work). This was inspired by is.gd.
    response.data.mobile = false;
    if(window.navigator.userAgent.match(/Android|iPhone|iPad/i)) {
        response.data.mobile = true;
    }

    Spice.render({
        data             : response.data,
        header1          : 'Shortened URL (Bitly)',
        source_url       : response.data.url + '+',
        image_url        : 'https://duckduckgo.com/iu/?u=http://i.imgur.com/xVpFr.png',
        source_name      : 'Bit.ly',
        template_normal  : 'bitly',
        force_big_header : true
    });

    var selectText = function(url) {
        url.focus().select();
    };

    // If we displayed an input box, make sure we focus on it.
    $(document).ready(function() {
        var url = $('input#bitly-url');
        selectText(url);
        url.on('click', function() {
            selectText(url);
        })
    });
}
