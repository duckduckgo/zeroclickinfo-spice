(function(env) {
    "use strict";
    env.ddg_spice_is_gdexpander = function (api_result) {
        // Exit immediately if we find an error message.
        if (!api_result || !api_result.url || api_result.errorcode) {
            return Spice.failed('is_gdexpander');
        }

        Spice.add({
            id: 'is_gdexpander',
            data: api_result,
            name: 'Expanded Link',
            meta: {
                sourceUrl : 'http://is.gd/',
                sourceName : 'is.gd',
            },
            templates: {
                group: 'text',
                options: {
                    content: Spice.is_gdexpander.is_gdexpander
                }
            },
        });

        // If we displayed an input box, make sure we focus on it.
        var url = $('.zci--is_gdexpander input.tag');
        url.click(function() {
            url.focus().select();
        }).click();
    }
}(this));
