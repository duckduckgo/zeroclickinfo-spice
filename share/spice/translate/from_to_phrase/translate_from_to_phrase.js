function ddg_spice_translate_from_to_phrase (api_result) {

    if (!api_result.matches.length) return;

    var params = get_params("from_to");

    Spice.render({
        data:               api_result,
        header1 :           params.to + ' translations for ' + params.phrase,
        source_name :       'MyMemory',
        source_url :        'http://mymemory.translated.net/s.php?q=' + params.phrase +
                            '&sl=' + params.from + '&tl=' + params.to ,
        force_big_header :  true,
        template_normal  :  'translate_from_to_phrase',

    });
}