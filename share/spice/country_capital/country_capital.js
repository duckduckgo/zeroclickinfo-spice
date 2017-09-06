(function(env) {
    "use strict";
    env.ddg_spice_country_capital = function(api_result) {

        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error) {
            return Spice.failed('country_capital');
        }

        var capitalize = function(str) {
                var splitStr = str.toLowerCase().split(' ');
                for (var i = 0; i < splitStr.length; i++) {
                    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
                }
                return splitStr.join(' ');
            }
            // Render the response
        Spice.add({
            id: "country_capital",
            name: "Capital",
            data: {
                country: capitalize(api_result.country),
                capital: api_result.capital
            },
            meta: {
                sourceName: "Wikipedia",
                sourceUrl: 'https://en.wikipedia.org/w/index.php?search=' + api_result.capital
            },
            templates: {
                group: 'text',
                options: {
                    content: Spice.country_capital.content,
                    moreAt: true
                }
            }
        });
    };
}(this));