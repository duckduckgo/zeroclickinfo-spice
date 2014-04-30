(function(env) {
    "use strict";
    env.ddg_spice_bible = function(api_result) {
        
        // Validity check
        if (!api_result || !api_result.length){
            return;
        } 

        var result = api_result[0];
        var header = result.bookname + ' ' + result.chapter + ':' + result.verse;

        Spice.add({
            id: 'bible',
            name: 'Bible',
            data: result,
            meta : {
                itemType: header + ' (Bible Verse)',
                sourceName: 'Bible.org',
                sourceUrl: 'http://bible.org/'
            },
            templates: {
                detail: Spice.bible.detail
            }
        });
    }
}(this));


/*******************************
  Handlebars helpers
  *******************************/

// Creates an anchor linking to a result's commments
Handlebars.registerHelper ('bible-cleanText', function(text) {
    "use strict";

    // Link to be removed.
    var rmlink = '<a style=\"\" target=\"_blank\" href=\"http:\/\/bible.org\/page.php?page_id=3537\">&copy;NET<\/a>';
    
    return text.replace(rmlink, '').replace('“', '').replace('”', '');
});
