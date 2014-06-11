function ddg_spice_rhymes(api_result) {
    "use strict";
    var query = DDG.get_query().replace(/^(what|rhymes?( with| for)?) |\?/gi, "");
    if (!api_result.length) {
        return Spice.failed("rhymes");
    }
    var words = [], count = 0;
    for (var i = 0, l = api_result.length; l > i; i++) {
        var word = api_result[i];
        if (300 === word.score && !word.flags.match(/a/)) {
            if (words.push(word), ++count > 15) {
                break;
            }
        }
    }
    if (0 === words.length) {
        return;
    }
    var title = DDG.capitalize(query.toLowerCase());
    Spice.add({
        data: {
            words: words,
            query: title
        },
        id: "rhymes",
        name: "Rhymes",
        meta: {
            sourceUrl: "http://rhymebrain.com/en/What_rhymes_with_" + encodeURIComponent(query) + ".html",
            sourceName: "RhymeBrain",
            sourceIcon: !0
        },
        templates: {
            group: "text",
            options: {
                content: Spice.rhymes.content,
                moreAt: !0
            }
        }
    });
}