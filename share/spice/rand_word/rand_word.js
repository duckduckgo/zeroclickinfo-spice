(function(env) {
    "use strict";
    env.ddg_spice_rand_word = function(api_result) {
        if (!api_result || api_result.length === 0) {
            return Spice.failed('rand_word');
        }

        var first = api_result[0];
        // dividing the whole array into an array of 4 elements each
        var list_of_list = [];
        while (api_result.length > 0) {
            list_of_list.push(api_result.splice(0, 4));
        }
        var spiceObj = {
            id: "rand_word",
            data: {
                title: 'Random Words',
                list: list_of_list
            },
            name: "Answer",
            meta: {
                sourceUrl: 'https://wordnik.com/randoml',
                sourceName: 'Wordnik',
                sourceIcon: true
            },
            templates: {
                group: 'list',
                options: {
                    list_content: Spice.rand_word.content,
                    moreAt: true
                }
            }
        };
        if (list_of_list[0].length == 1) {
            $.getJSON("/js/spice/rand_word_fetch_id/" + first.word, function(data) {
                var first = data[0];
                $.extend(spiceObj, {
                    data: {
                        word: first.word,
                        definition: first.text
                    },
                    templates: {
                        group: 'text'
                    },
                    normalize: function(item) {
                        return {
                            title: item.word,
                            url: "http://wordnik.com/words/" + item.word,
                            description: item.definition,
                        }
                    }
                });

                Spice.add(spiceObj);
            });
        } else {
            Spice.add(spiceObj);
        }
    }
}(this));
