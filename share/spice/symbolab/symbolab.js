(function (env) {
    "use strict";
    env.ddg_spice_symbolab = function(api_result){

        // Validate the response (customize for your Spice)
        if (!api_result || (!api_result.page && !api_result.solution)) {
            return Spice.failed('symbolab');
        }

        if (api_result.page){
            Spice.add({
                id: "symbolab",
                name: "Symbolab",
                data: api_result,
                meta: {
                    sourceName: "Symbolab.com",
                    sourceUrl: api_result.page.url,
                    sourceIconUrl: 'https://www.symbolab.com/favicon.ico'
                },
                normalize: function(item) {
                    return {
                        description: api_result.page.description,
                        image: api_result.page.img,
                        title: "Symbolab - " +api_result.page.title
                    }; 
                },
                templates: {
                    group: 'info'
                }
            });
        }
        else if (api_result.solution){
            Spice.add({
                id: "symbolab",
                name: "Symbolab",
                data: api_result,
                meta: {
                    sourceName: "Symbolab.com",
                    sourceUrl: api_result.solution.url
                },
                normalize: function(item) {
                    return {
                        latex: api_result.solution.presentation,
                        url: api_result.solution.url,
                        hasPlot: api_result.solution.hasPlot
                    }; 
                },
                templates: {
                    group: 'base',
                    options: {
                        content: Spice.symbolab.solution,
                        moreAt: false
                    }
                }
            });
        }
    };
}(this));
