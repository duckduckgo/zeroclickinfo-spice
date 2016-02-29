(function(env) {
    "use strict";
    env.ddg_spice_rhymes = function(api_result) {

        var query = DDG.get_query()
        .replace(/^(what|rhymes?( with| for)?) |\?/gi, "");

        if (!(api_result && api_result.length)) {
            return Spice.failed('rhymes');
        }

        var words = [], count=0;

        for(var i=0, l = api_result.length; i<l; i++) {
            var word = api_result[i];

            if (word.score === 300 && !word.flags.match(/a/)) {
                words.push(word);
                if (++count > 15)
                    break;
            }
        }

        if(words.length === 0) {
            return Spice.failed('rhymes');
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
                sourceUrl: 'http://rhymebrain.com/en/What_rhymes_with_' +
                encodeURIComponent(query) + '.html',
                sourceName: 'RhymeBrain',
                sourceIcon: true
            },
            templates: {
                group: 'base',
                options: {
                    content: Spice.rhymes.content,
                    moreAt: true
                }
            }
        });
    }
}(this));
