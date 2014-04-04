function ddg_spice_rand_word(api_result) {
    if (!api_result.word) return;

    Spice.add({
        data             : api_result,
        sourceUrl       : 'http://wordnik.com',
        sourceName      : 'Wordnik',
        template_normal  : 'rand_word',
    });
}
