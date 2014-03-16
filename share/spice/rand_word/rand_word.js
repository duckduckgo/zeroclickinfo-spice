function ddg_spice_rand_word(api_result) {
    "use strict";

    if (!api_result.word) {
        return;
    }

    Spice.render({
        data             : api_result,
        source_url       : 'http://wordnik.com',
        source_name      : 'Wordnik',
        template_normal  : 'rand_word',
    });
}
