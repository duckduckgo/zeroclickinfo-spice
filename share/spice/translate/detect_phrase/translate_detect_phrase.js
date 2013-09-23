function ddg_spice_translate_detect_phrase (api_result) {

    var params = get_params("detect", api_result);

    // translate multi-word phrase
    if (params.phrase_len > 1 && params.from && params.to) {
        var endpoint = '/js/spice/translate/from_to_phrase/';
        nrj(endpoint + params.short_from + '/' + params.short_to + '/' + params.phrase);
    }
}