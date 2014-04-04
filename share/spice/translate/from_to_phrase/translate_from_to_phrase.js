function ddg_spice_translate_from_to_phrase (api_result) {

    if (!api_result.matches.length) return;

    var params = get_params("from_to");

    Spice.add({
        data:               api_result,
        header1 :           params.to + ' translations for ' + params.phrase,
        sourceName :       'MyMemory',
        sourceUrl :        'http://mymemory.translated.net/s.php?q=' + params.phrase +
                            '&sl=' + params.from + '&tl=' + params.to ,
        
        template_normal  :  'translate_from_to_phrase',

    });
}