var ddg_spice_detect_lang = function(api_result) {
    "use strict";

    var langs = {
        'af': 'Afrikaans',
        'ar': 'Arabic',
        'be': 'Belarusian',
        'bg': 'Bulgarian',
        'ca': 'Catalan',
        'chr': 'Cherokee',
        'cs': 'Czech',
        'cy': 'Welsh',
        'da': 'Danish',
        'de': 'German',
        'dv': 'Dhivehi',
        'el': 'Greek',
        'en': 'English',
        'es': 'Spanish',
        'et': 'Estonian',
        'fa': 'Persian',
        'fi': 'Finnish',
        'fil': 'Tagalog',
        'fr': 'French',
        'ga': 'Irish',
        'gu': 'Gujarati',
        'he': 'Hebrew',
        'hi': 'Hindi',
        'hr': 'Croatian',
        'hu': 'Hungarian',
        'hy': 'Armenian',
        'is': 'Icelandic',
        'it': 'Italian',
        'iu': 'Inuktitut',
        'ja': 'Japanese',
        'ka': 'Georgian',
        'km': 'Khmer',
        'kn': 'Kannada',
        'ko': 'Korean',
        'lo': 'Laothian',
        'lt': 'Lithuanian',
        'lv': 'Latvian',
        'mk': 'Macedonian',
        'ml': 'Malayalam',
        'ms': 'Malay',
        'nb': 'Norwegian',
        'nl': 'Dutch',
        'or': 'Oriya',
        'pa': 'Punjabi',
        'pl': 'Polish',
        'pt': 'Portuguese',
        'ro': 'Romanian',
        'ru': 'Russian',
        'si': 'Sinhalese',
        'sk': 'Slovak',
        'sl': 'Slovenian',
        'sr': 'Serbian',
        'sv': 'Swedish',
        'sw': 'Swahili',
        'syr': 'Syriac',
        'ta': 'Tamil',
        'te': 'Telugu',
        'th': 'Thai',
        'tr': 'Turkish',
        'uk': 'Ukrainian',
        'vi': 'Vietnamese',
        'yi': 'Yiddish',
        'zh': 'Chinese',
        'zh-TW': 'Chineset'
    };

    var toPercent = function(confidence) {
        return Math.round(confidence * 100) + "% sure";
    };

    var detections = api_result.data.detections, result;

    if(detections[0].isReliable) {
        result = "This text is definitely " + langs[detections[0].language] + " (" + toPercent(detections[0].confidence) + ").";
    } else if(detections.length === 1) {
        result = "This text is probably " + langs[detections[0].language] + " (" + toPercent(detections[0].confidence) + ").";
    } else if(detections.length > 1) {
        result = "This text is probably " + langs[detections[0].language] + " (" + toPercent(detections[0].confidence);
        result += "), but it could also be "  + langs[detections[1].language] + " (" + toPercent(detections[1].confidence) + ").";
    }

    // Display the plug-in.
    Spice.render({
        data             : {result: result},
        header1          : "Language Detection (Detect Language)",
        source_url       : "http://detectlanguage.com/",
        source_name      : "Detect Language",
        template_normal  : "detect_lang",
        force_big_header : true
    });
};