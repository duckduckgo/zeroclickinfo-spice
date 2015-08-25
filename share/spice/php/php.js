(function (env) {
    "use strict";

    function htmlEntities(str) {
        return String(str).replace("&amp;", '&').replace("&lt;", '<').replace("&gt;", '>').replace("&quot;", '"');
    }

    env.ddg_spice_php = function(api_result) {

        // Validate the response (customize for your Spice)
        if (!api_result || api_result.errorCode != 200) {
            return Spice.failed('php');
        }

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
            normalize: function(item) {
                item.altSubtitle = "(" + item.version.toString() + ")";
                item.synopsis = htmlEntities(item.synopsis);

                return item;
            },
            templates: {
                item: 'text_item',
                detail: Spice.php.detail,
                options: {
                    moreAt: true,
                    moreText: {
                        href: api_result.link
                    }
                }
            }
        });
    };

}(this));
