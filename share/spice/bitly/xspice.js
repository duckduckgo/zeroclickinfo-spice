function ddg_spice_bitly(response) {

    // Exit immediately if we find an error message.
	if (!response || !response.status_code === 200 || !response.data || !response.data.url) {
        return;
    }

    var template = "bitly";

    // Check if it is a mobile browser (needs work). This was inspired by is.gd.
    if(window.navigator.userAgent.match(/Android|iPhone|iPad/i)) {
        template += "-mobile";
    }

    Spice.render({
        data             : response.data,
        header1          : 'Shortened URL (Bitly)',
        source_url       : response.data.url + "+",
        image_url        : "https://duckduckgo.com/iu/?u=http%3A%2F%2Fi.imgur.com%2FxVpFr.png",
        source_name      : 'Bit.ly',
        template_normal  : template,
        force_big_header : true
    });

    var selectText = function(url) {
        url.focus().select();
    };

    // If we displayed an input box, make sure we focus on it.
    $(document).ready(function() {
        var url = $("input#bitly-url");
        selectText(url);
        url.on("click", function() {
            selectText(url);
        })
    });
}
