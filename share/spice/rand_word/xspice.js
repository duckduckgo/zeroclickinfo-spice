function ddg_spice_rand_word(response) {
    if (!response.word) return;

    Spice.render({
        data             : { 'word' : response.word },
        source_url       : 'http://wordnik.com',
        source_name      : 'Wordnik',
        template_normal  : 'rand_word',
    });
}
