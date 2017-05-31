(function (env) {
    "use strict";

    env.ddg_spice_translate = function(api_result) {

        // Validate the response (customize for your Spice)
        if (!api_result || api_result.err) {
            return Spice.failed('translate');
        }
        
        let response = api_result;
        let translation = [];
        let originalText = [];
        for(var i = 0; i < response[0].length; i++) {
            translation.push(response[0][i][0]);
            originalText.push(response[0][i][1]);
        }
        translation = translation.join(' ');
        originalText = originalText.join(' ');
        let originLang = decodeURI(response[2]);

        // Render the response
        Spice.add({
            id: 'translate',
            signal:"high",
            name: `Translate`,
            data: {
                translation: translation,
                originalLanguage: originLang,
                originalText: originalText
            },
            meta: {
                sourceName: 'Google Translate',
                sourceUrl: `https://translate.google.com/#auto/en/${encodeURI(originalText)}`
            },
            normalize: function(item) {
                return {
                    // customize as needed for your chosen template
                    title: `Translate "${originalText}" from ${originLang} to English`,
                    translation: translation,
                    icon: 'https://icons.duckduckgo.com/ip2/translate.google.com.ico'
                };
            },
            templates: {
                group: 'base',
                options: {
                    content: Spice.translate.footer,
                    moreAt: true
                }
            }
        });
    };
}(this));
