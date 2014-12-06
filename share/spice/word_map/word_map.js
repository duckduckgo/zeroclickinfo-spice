(function(env){    
    env.ddg_spice_word_map = function(api_result) {
        "use strict";

        if ( (!api_result) || ("200" !== api_result.result_code)) {
    	   return Spice.failed('word_map');
        }

        Spice.add({
            id: 'word_map',
            name: 'Answer',
            data: {
                wordmap_link: api_result.wordmap_link,
                title: "Related to " + api_result.entry + ":",
            },
            meta: {
                sourceUrl: 'http://levelpump.com/graph-dictionary.php?mailLink=' + encodeURIComponent(api_result.encrypt_entry) + '&from=ddg',
                sourceName: 'Levelpump',
                sourceIconUrl: 'http://icons.duckduckgo.com/ip/www.levelpump.com.ico'
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
