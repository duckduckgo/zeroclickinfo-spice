(function(env) {
    "use strict";
    env.ddg_spice_detect_lang = function (api_result) {

        // Check for any errors.
        if(!api_result || !api_result.data || !api_result.data.detections || api_result.data.detections.length === 0) {
            return Spice.failed('detect_lang');
        }

        api_result.data.detections.sort(function(a, b) {
            if(a.confidence > b.confidence) {
                return -1;
            } else if(a.confidence < b.confidence) {
                return 1;
            }
            return 0;
        });

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
        Handlebars.registerHelper("DetectLang_expandLang", expandLang);

        if(expandLang(api_result.data.detections[0].language) === "") {
            return;
        }

        var d0 = api_result.data.detections[0],
            d1 = null;

        if (api_result.data.detections.length > 1) {
            d1 = api_result.data.detections[1];
        }

        // Display the plug-in.
        Spice.add({
            id: 'detect_lang',
            data: {
                first: d0,
                second: d1
            },
            name: "Answer",
            meta: {
                sourceUrl: "http://detectlanguage.com/",
                sourceName: "Detect Language",
            },
            signal: 'high',
            templates: {
                group: 'base',
                options: {
                    content: Spice.detect_lang.content,
                    moreAt: true
                }
            }
        });
    };

    Handlebars.registerHelper("DetectLang_toPercent", function(confidence) {
        "use strict";
        var percentage = Math.round(confidence * 100);
        return (percentage > 100 ? 100 : percentage) + "% sure";
    });
}(this));
