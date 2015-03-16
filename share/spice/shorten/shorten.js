(function(env) {
    "use strict";
    env.ddg_spice_shorten = function (api_result) {
        // Exit immediately if we find an error message.
        if (!api_result || !api_result.shorturl || api_result.errorcode) {
            return Spice.failed('shorten');
        }

        var script = $('[src*="/js/spice/shorten/"]')[0],
            source = $(script).attr("src"),
            sourceURL = decodeURIComponent(source.match(/shorten\/https?\/(.+)/)[1]);

        Spice.add({
            id: 'shorten',
            data: 
                {
                    "shorturl": api_result.shorturl,
                    "sourceURL": sourceURL
                },
            name: 'Shortened Link',
            meta: {
                sourceUrl : 'http://is.gd/',
                sourceName : 'is.gd',
            },
            templates: {
                group: 'base',
                options: {
                    content: Spice.shorten.shorten,
                    moreAt: true
                }
            },
        });

        // If we displayed an input box, make sure we focus on it.
        var url = $('.zci--shorten input.tag');
        url.click(function() {
            url.focus().select();
        }).click();
    }
}(this));
