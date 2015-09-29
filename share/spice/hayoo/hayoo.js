(function(env) {	
    env.ddg_spice_hayoo = function(api_result) {
        "use strict";
          
        if (!api_result) {
            Spice.failed("hayoo");
        }
    
        var query = DDG.get_query().replace(/\s*hayoo\s*/i, '');
	  
        Spice.add({
            id: 'hayoo',
            name: 'Software',
            data: api_result.result,
            meta: {
                itemType: "results",
                sourceUrl: "http://hayoo.fh-wedel.de/?query=" + query,
                sourceName: 'Hackage'
            },
            normalize: function(item) {
                if (!item.resultPackage || !item.resultDescription) {
                    return;
                }
                return {
                    title: item.resultName + " (" + item.resultType + ")",
                    subtitle: item.resultPackage,
                    description: DDG.strip_html(item.resultDescription),
                    url: item.resultUri
                };
            },
            templates: {
                group: 'text',
                detail: false,
                item_detail: false,
            }    
        });
    }
}(this));

