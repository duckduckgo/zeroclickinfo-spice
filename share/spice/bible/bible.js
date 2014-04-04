function ddg_spice_bible(api_result) {
    "use strict";

    // Validity check
    if (!api_result.length) return;

    var result = api_result[0];
    var header = result.bookname + ' ' + result.chapter + ':' + result.verse;

    Spice.add({
        data              : result,
        header1           : header + ' (Bible Verse)',
        sourceName       : 'Bible.org',
        sourceUrl        : 'http://bible.org/',
        template_normal   : 'bible',
        
        force_favicon_url : 'http://bible.org/sites/bible.org/files/borg6_favicon.ico'
    });
}


/*******************************
  Handlebars helpers
  *******************************/

// Creates an anchor linking to a result's commments
Handlebars.registerHelper ('cleanText', function(text) {
    "use strict";

    // Link to be removed.
    var rmlink = '<a style=\"\" target=\"_blank\" href=\"http:\/\/bible.org\/page.php?page_id=3537\">&copy;NET<\/a>';
    
    return text.replace(rmlink, '').replace('“', '').replace('”', '');
});
