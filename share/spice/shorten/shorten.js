(function(env) {
    "use strict";
    env.ddg_spice_shorten = function (api_result) {
        // Exit immediately if we find an error message.
        if (!api_result || !api_result.shorturl || api_result.errorcode) {
            return Spice.failed('shorten');
        }

        // Check if it is a mobile browser (needs work). This was inspired by is.gd.
        api_result.mobile = false;
        if(window.navigator.userAgent.match(/Android|iPhone|iPad|iPod/i)) {
            api_result.mobile = true;
        }

        Spice.add({
            id: 'shorten',
            data: api_result,
            name: 'Shortened Link (is.gd)',
            meta: {
                sourceUrl : 'http://is.gd/',
                sourceName : 'is.gd',
            },
            templates: {
                group: 'text',
                options: {
                    content: Spice.shorten.shorten
                }
            },
        });

        // If we displayed an input box, make sure we focus on it.
        var url = $('.zci--shorten input.tag');
        url.click(function() {
            url.focus().select();
        }).click();
    }
}(this))
