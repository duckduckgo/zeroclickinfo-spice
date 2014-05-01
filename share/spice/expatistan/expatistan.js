(function(env){
    env.ddg_spice_expatistan = function(api_result) {
        "use strict";

        if(!api_result || api_result.status !== 'OK') {
            return Spice.failed('expatistan');
        }

        Spice.add({
            id: "expatistan",
            name: "Expatistan",
            data: api_result,
            meta: {
                sourceUrl: api_result.source_url,
                sourceName: 'Expatistan'
            },
            templates: {
                group: 'base',
                options: {
                    content: Spice.expatistan.content,
		    moreAt: true
                }
            }
        });
    }
}(this));
