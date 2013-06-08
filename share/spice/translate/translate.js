function get_params(name, api_result) {

    var regex = {
        "from_to" : /^translate (.*?)(?: from ([a-z]+))?(?: to ([a-z]+))?$/,
        "detect"  : /^translate (.*?)(?: to ([a-z]+))?$/
    };

    var query = DDG.get_query().toLowerCase().replace(/\s+/g, " ");
    var match = query.match(regex[name]);

    // get 2 letter language code
    function shorten_lang(lang, flag){
        var langs = {'arabic' : 'ar','chinese' : 'zh','czech' : 'cz','english' : 'en','french' : 'fr','greek' : 'gr','italian' : 'it','japanese' : 'ja','korean' : 'ko','polish' : 'pl','portuguese' : 'pt','romanian' : 'ro','spanish' : 'es','turkish' : 'tr'},
            convert = {'cs': 'cz', 'el': 'gr'},
            out = langs[lang] || lang;

        if (flag && convert[out]){
            return convert[out];
        }

        return out;
    }

    // if there was a match against the regex
    if (match.length) {
        match.shift(); //match array[0] is always full phrase

        // check if we're detecting a language
        var flag = (name === "detect"),
            script,
            source,
            lang_match,
            to_lang,
            from_lang;

        // grab language to translate from/to
        // if not in query
        if (!match[1]){

            if (flag) {
                script  = $("[src*='js/spice/translate/detect']")[0],
                source  = $(script).attr("src"),
                lang_match = source.match(/([a-z]{2})$/),
                to_lang = lang_match[0];

            } else {
                script  = $("[src*='js/spice/translate/from_to']")[0],
                source  = $(script).attr("src"),
                lang_match = source.match(/from_to(?:_phrase)?\/([a-z]{2})/),
                from_lang = lang_match[1];
            }
        }

        var out = {};
        out.phrase = match[0];

        if (flag) {
            out.from = api_result.data.detections[0].language;
            out.to   = match[1] || to_lang;
        } else {
            out.from = match[1] || from_lang;
            out.to   = match[2];
        }

        out.short_from = shorten_lang(out.from, flag);
        out.short_to   = shorten_lang(out.to, flag);
        out.from_to    = out.short_from + out.short_to;
        out.phrase_len = match[0].split(' ').length;

        return out;
    }

    return undefined;
}

function ddg_spice_translate_from_to (api_result) {

    if (api_result.Error) return;

    var params = get_params("from_to"),
        endpoint;


    Spice.render({
        data             :  api_result,
        header1          :  params.to + ' translations for ' + params.phrase,
        source_name      :  'wordreference.com',
        source_url       :  'https://wordreference.com/' + params.from_to + '/' + params.phrase,
        template_normal  :  'translate_from_to',
        force_big_header :  true
    });
}

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
