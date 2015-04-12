(function(env) {
    "use strict";
    env.ddg_spice_bible = function(api_result) {

        // Validity check
        if (!api_result || !api_result.length){
            return Spice.failed('bible');
        }

        var result = api_result[0];
 
        Spice.add({
            id: 'bible',
            name: 'Answer',
            data: result,
            meta: {
                sourceName: 'Bible',
                sourceUrl: 'http://bible.org/',
                sourceIconUrl: 'http://bible.org/sites/bible.org/files/borg6_favicon.ico'
            },
            templates: {
                group: 'base',
                options: {
                    content: Spice.bible.content,
		    moreAt: true
                }
            },
            normalize: function(item){
                // text come with a link at the end that needs to be removed
                var rmlink = '<a style=\"\" target=\"_blank\" href=\"http:\/\/bible.org\/page.php?page_id=3537\">&copy;NET<\/a>';
                return { 
                    header: item.bookname + ' ' + item.chapter + ':' + item.verse,
                    text: item.text.replace(rmlink, '').replace('“', '').replace('”', '')
                };
            }
        });
    }
}(this));
