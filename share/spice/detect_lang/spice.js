langs = {
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

function ddg_spice_detect_lang(ir) {
	items = new Array();
        //console.log(ir);
	detects = ir.data.detections;

	if (detects.length == 0)
		return;

	detects.sort(function (a, b) { return a.confidence < b.confidence; });

	items[0] = new Array();
	items[0]["h"] = 'Detected languages:';
	items[0]['s'] = 'detectlanguage.com';
	items[0]['u'] = 'http://detectlanguage.com/';
	items[0]["force_big_header"] = true;
        var text = 'This is probably ';
        var skipped = false;
        var at_least_one = false;
	for (i in detects) {
		lang  = langs[detects[i].language];
                if (lang == undefined) {
                    skipped = true;
		    continue;
                } else {
                    at_least_one = true;
                }
                if(i === '1' && !skipped) {
                    text += ", but it could also be ";
                } 
		conf = Math.ceil(detects[i].confidence * 100);
		text += lang + ' (' + conf + '% sure)';
                if(detects[i].isReliable === true) {
                    break;
                }
	}
        text += '.<div style="clear';
        if(!at_least_one) {
            return;
        }
	items[0]['a'] = text;
	nra(items);
}
