(function (env) {
    "use strict";
    env.ddg_spice_random_bible_verse = function(api_result) {

        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error) {
            return Spice.failed('random_bible_verse');
        }

        // Render the response
        Spice.add({
            id: "random_bible_verse",

            // Customize these properties
            name: "Random Bible Verse",
            data: api_result[0],
            meta: {
                sourceName: "Bible",
                sourceUrl: 'https://net.bible.org/',
                sourceIconUrl: 'http://bible.org/sites/bible.org/files/borg6_favicon.ico'
                
            },
            templates: {
                group: 'text',
                options: {
                    content: Spice.random_bible_verse.content,
                    moreAt: true
                }
            },
            normalize: function(item) {
                return {
                    // customize as needed for your chosen template
                    title:item.bookname+' '+item.chapter+':'+item.verse,
                    text:item.text
                };
            }
        });
    };
}(this));