var ddg_spice_detect_lang = function(api_result) {
    "use strict";

    // Check for any errors.
    if(!api_result || !api_result.data || !api_result.data.detections || api_result.data.detections.length === 0) {
        return;
    }

    var expandLang = function(language) {
        var langs = {
            af: "Afrikaans",
            am: "Amharic",
            ar: "Arabic",
            az: "Azerbaijani",
            be: "Belarusian",
            bg: "Bulgarian",
            bn: "Bengali",
            bo: "Tibetan",
            ca: "Catalan",
            chr: "Cherokee",
            cs: "Czech",
            cy: "Welsh",
            da: "Danish",
            de: "German",
            dv: "Dhivehi",
            el: "Greek",
            en: "English",
            es: "Spanish",
            et: "Estonian",
            eu: "Basque",
            fa: "Persian",
            fi: "Finnish",
            fil: "Tagalog",
            fr: "French",
            ga: "Irish",
            gl: "Galician",
            gu: "Gujarati",
            he: "Hebrew",
            hi: "Hindi",
            hr: "Croatian",
            ht: "Haitian Creole",
            hu: "Hungarian",
            hy: "Armenian",
            id: "Indonesian",
            is: "Icelandic",
            it: "Italian",
            iu: "Inuktitut",
            ja: "Japanese",
            ka: "Georgian",
            km: "Khmer",
            kn: "Kannada",
            ko: "Korean",
            lo: "Laothian",
            lt: "Lithuanian",
            lv: "Latvian",
            mk: "Macedonian",
            ml: "Malayalam",
            ms: "Malay",
            mt: "Maltese",
            my: "Burmese",
            nb: "Norwegian",
            nl: "Dutch",
            or: "Oriya",
            pa: "Punjabi",
            pl: "Polish",
            pt: "Portuguese",
            ro: "Romanian",
            ru: "Russian",
            si: "Sinhalese",
            sk: "Slovak",
            sl: "Slovenian",
            sq: "Albanian",
            sr: "Serbian",
            sv: "Swedish",
            sw: "Swahili",
            syr: "Syriac",
            ta: "Tamil",
            te: "Telugu",
            th: "Thai",
            tr: "Turkish",
            uk: "Ukrainian",
            ur: "Urdu",
            vi: "Vietnamese",
            yi: "Yiddish",
            zh: "Chinese"
        };

        return langs[language] || "";
    };
    Handlebars.registerHelper("expandLang", expandLang);

    if(expandLang(api_result.data.detections[0].language) === "") {
        return;
    }

    // Display the plug-in.
    Spice.render({
        data             : api_result.data.detections[0],
        header1          : "Language Detection (Detect Language)",
        source_url       : "http://detectlanguage.com/",
        source_name      : "Detect Language",
        template_normal  : "detect_lang",
        force_big_header : true
    });
};

Handlebars.registerHelper("toPercent", function(confidence) {
    "use strict";
    return Math.round(confidence * 100) + "% sure";
});

Handlebars.registerHelper("confidence", function(isReliable) {
    "use strict";
    if(isReliable) {
        return "definitely";
    } else {
        return "probably";
    }
});