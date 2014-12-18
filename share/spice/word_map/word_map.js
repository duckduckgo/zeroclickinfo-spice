(function(env){    
    env.ddg_spice_word_map = function(api_result) {
        "use strict";

        if ( (!api_result) || ("200" !== api_result.result_code)) {
    	   return Spice.failed('word_map');
        }

        Spice.add({
            id: 'word_map',
            name: 'Answer',
            data: api_result,
            meta: {
                sourceUrl: 'http://levelpump.com/graph-dictionary.php?mailLink=' + encodeURIComponent(api_result.encrypt_entry) + '&from=ddg',
                sourceName: 'Levelpump',
                sourceIconUrl: 'http://icons.duckduckgo.com/ip/www.levelpump.com.ico'
            },
            normalize: function(item) {
                return {
                    title: "Related to " + api_result.entry
                };
            },
            templates: {
                group: 'text',
                options: {
                    content: Spice.word_map.content,
                    moreAt: true
                }
            }
        });
    }
}(this));
