(function(env){    
    env.ddg_spice_word_map = function(api_result) {
        "use strict";

        if ( (!api_result) || ("200" !== api_result.result_code)) {
    	   return Spice.failed('word_map');
        }

        Spice.add({
            id: 'word_map',
            name: 'Word Map',
            data: api_result,
            meta: {
                sourceUrl: 'http://levelpump.com/graph-dictionary.php?mailLink=' + encodeURIComponent(api_result.encrypt_entry) + '&from=ddg',
                sourceName: 'Levelpump',
                sourceIconUrl: 'http://icons.duckduckgo.com/ip/www.levelpump.com.ico'
            },
            templates: {
                group: 'info',
                options: {
                    content: Spice.word_map.content
                }
            }
        });
    }
}(this));