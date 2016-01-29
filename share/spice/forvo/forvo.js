(function (env) {
    "use strict";
    env.ddg_spice_forvo = function(api_result){
        
        if (!api_result || api_result.error) {
            return Spice.failed('forvo');
        }
        
        if (api_result.attributes.total < 1) return;
        
        var script = $('[src*="/js/spice/forvo/"]')[0];
        var source = $(script).attr("src");
        var query = source.match(/forvo\/([^\/]+)\/\w+/)[1];
        query = decodeURIComponent(query);

        DDG.require('audio', function(){
            Spice.add({
                id: "forvo",
                name: "Pronunciation",
                data: {
                    list: api_result.items
                },
                meta:{
                    sourceName: "Forvo",
                    sourceUrl: "http://forvo.com/search/" + query,
                },
                templates: {
                    group: 'list',
                    options: {
                        list_content: Spice.forvo.forvo,
                        moreAt: true
                    }
                },
                normalize: function(item) {
                    return {
                        title: 'Pronunciations of ' + query
                    };
                },
            });
        });
    };
}(this));

// The sex (returned as either "m" or "f") should be expanded.
Handlebars.registerHelper("forvo_sex", function(sex) {
    "use strict";

    if(sex === "m")
        return "Male";

    return "Female";
});