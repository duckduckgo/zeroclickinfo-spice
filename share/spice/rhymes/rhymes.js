function ddg_spice_rhymes ( api_result ) {
    "use strict";

    var query = DDG.get_query()
                .replace(/^(what|rhymes?( with| for)?) |\?/gi, "");

    if (!api_result.length) {
        return;
    }

    Spice.render({
        data             : api_result,
        header1          : query + " (Rhymes)",
        source_url       : 'http://rhymebrain.com/en/What_rhymes_with_' +
                            encodeURIComponent(query),
        source_name      : 'RhymeBrain',
        template_normal  : 'rhymes',
        force_big_header : true
    });
}

// Randomly selects rhyming words from the
// list returned by the RhymeBrain API
Handlebars.registerHelper('selectRhymes', function(options) {
    "use strict";

    var words = [];

    for (var i = 0; i < this.length && i < 15; i++) {
        var word = this[i];

        if (word.score === 300 && !word.flags.match(/a/)) {
            words.push(word);
        }
    }

    return options.fn(words);
});
