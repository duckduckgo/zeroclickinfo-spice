function ddg_spice_rhymes ( api_result ) {
    var query = DDG.get_query()
                .replace(/^(what|rhymes?( with| for)?) |\?/gi, "");

    if (!api_result.length) {
        return;
    }

    Spice.add({
        data             : api_result,
        header1          : query + " (Rhymes)",
        sourceUrl       : 'http://rhymebrain.com/en/What_rhymes_with_' +
                            encodeURIComponent(query),
        sourceName      : 'RhymeBrain',
        templates: {
            item: Spice.rhymes.rhymes,
            detail: Spice.rhymes.rhymes
        },
        
    });
}

// Randomly selects rhyming words from the
// list returned by the RhymeBrain API
Handlebars.registerHelper('selectRhymes', function(options) {
    var words = [];

    for (var i = 0; i < this.length && i < 15; i++) {
        var word = this[i];

        if (word.score === 300 && !word.flags.match(/a/)) {
            words.push(word);
        }
    }

    return options.fn(words);
});