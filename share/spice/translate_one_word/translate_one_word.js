(function (env) {
    "use strict";
    env.ddg_spice_translate_one_word = function(api_result){

        if (!api_result || api_result.error) {
            return Spice.failed('translate_one_word');
        }

        Spice.add({
            id: "translate_one_word",
            name: "Translation",
            data: api_result,
            meta: {
                sourceName: "Yandex.com",
                sourceUrl: 'https://tech.yandex.com/translate/',
                sourceIcon: true
            },
            templates: {
                group: 'base',
                options: {
                    content: Spice.translate_one_word.content,
                    moreAt: true
                }
            }
        });
    };
}(this));
