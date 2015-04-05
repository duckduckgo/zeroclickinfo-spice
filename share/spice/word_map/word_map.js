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
                sourceUrl: 'http://www.wordelephant.com/?mailLink=' + encodeURIComponent(api_result.encrypt_entry) + '&from=ddg',
                sourceName: 'Twinword',
                /* Current icon should be change with new one at https://www.twinword.com/favicon.ico */
                sourceIconUrl: 'http://icons.duckduckgo.com/ip/www.twinword.com.ico'
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
