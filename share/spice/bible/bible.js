(function(env) {
    "use strict";
    env.ddg_spice_bible = function(api_result) {

        // Validity check
        if (!api_result || !api_result.length){
            return Spice.failed('bible');
        }

        var result = api_result[0],
            source_url = "https://net.bible.org/#!bible/" + DDG.get_query();

        Spice.add({
            id: 'bible',
            name: 'Answer',
            data: result,
            signal: 'high',
            meta: {
                sourceName: 'Bible',
                sourceUrl: source_url,
                sourceIconUrl: 'http://bible.org/sites/bible.org/files/borg6_favicon.ico'
            },
            templates: {
                group: 'text',
                options: {
                    content: Spice.bible.content,
                    moreAt: true
                }
            },
            normalize: function(item){
                // text come with a link at the end that needs to be removed
                var text = $('<span />').html(item.text).text(),
                    subtitle = (item.title) ? $('<span />').html(item.title).text() : '',
                    text = $.trim(DDG.strip_html(text).replace('©NET', '').replace(/(“|”)/g, '').replace('[[EMPTY]]', ''));

                if (!text) {
                    return Spice.failed('bible');
                }

                return {
                    title: item.bookname + ' ' + item.chapter + ':' + item.verse,
                    subtitle: subtitle,
                    text: text
                };
            }
        });
    }
}(this));
