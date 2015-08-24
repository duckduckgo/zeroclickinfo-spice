(function (env) {
    "use strict";

    env.ddg_spice_php = function(api_result) {

        // Validate the response (customize for your Spice)
        if (!api_result || api_result.errorCode != 200) {
            return Spice.failed('php');
        }

        console.log(api_result);

        // Render the response
        Spice.add({
            id: "php",

            // Customize these properties
            name: api_result.title,
            data: api_result.data,
            meta: {
                sourceName: "More at php.net",
                sourceUrl: api_result.link,
                sourceIcon: true,
                sourceIconUrl: "http://php.net/favicon.ico"
            },
            templates: {
                item: 'base_item',
                detail: "base_item_detail",
                options: {
                    content: Spice.php.content,
                    moreAt: true,
                    moreText: {
                        href: api_result.link
                    }
                }
            }
        });
    };

}(this));
