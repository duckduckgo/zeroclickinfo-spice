# Get the global object and attach ddg_spice_detect_lang to it.
root = this
root.detect_lang = {}

# We'll use this to convert language codes to their respective names.
langs = 
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

# Sort an array based on the confidence.
sortConfidence = (a, b) -> a.confidence < b.confidence

# Convert the number to a percentage.
toPercent = (number = 0) -> "(#{Math.round(number * 100)}% sure)"

# Main function of the spice plugin.
root.ddg_spice_detect_lang = (language) ->
    items = []
    detections = language?.data?.detections
    if detections and detections.length > 0
        detections.sort sortConfidence

        # Filter languages based on our hash table.
        # This checks if the language code exists. If it doesn't
        # then it sould be discarded.
        detections = for element in detections when langs[element.language]? and element.confidence?
            language: langs[element.language], confidence: toPercent(element.confidence), isReliable: element.isReliable

        # Checks if we have one or more results after the filter.
        # It also checks if it is reliable or not.
        length = detections.length
        if length > 0
            if detections[0].isReliable 
                result = "This text is definitely #{detections[0].language} #{detections[0].confidence}."
                detections = [detections[0]]
            else if length is 1
                result = "This text is probably #{detections[0].language} #{detections[0].confidence}."
            else if length > 1
                result = "This text is probably #{detections[0].language} #{detections[0].confidence}"
                result += ", but it could also be #{detections[1].language} #{detections[1].confidence}."

        # detect_lang.debug is set whenever the spec is run.
        # This effectively 
        if root.detect_lang.debug is true
            return {
                detections,
                result
            }
        # Display the spice
        else if result?
            query = DDG.get_query().replace /(?:detect|identify|what|determine|check)\s+language/, ""
            query = query.replace /^\s+|\s+$/g, ""
            items[0] = 
                h: "#{query} (Language Detection)"
                s: "detectlanguage.com"
                u: "http://detectlanguage.com"
                force_big_header: true
                force_space_after: true
                a: result
            nra items