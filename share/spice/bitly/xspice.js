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

    // Thanks to Jason for his answer on http://stackoverflow.com/a/987376.
    var select = function(url) {
        if($("body").createTextRange) {
            range = $("body").createTextRange();
            range.moveToElementText(url.get(0));
            range.select();
        } else if(window.getSelection) {
            selection = window.getSelection();
            range = document.createRange();
            range.selectNodeContents(url.get(0));
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }

    $(document).ready(function() {
        var url = $("#bitly-url");
        select(url);
    });
}
