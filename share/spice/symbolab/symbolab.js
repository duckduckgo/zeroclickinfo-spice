(function (env) {
    "use strict";
    env.ddg_spice_symbolab = function (api_result) {

        // Validate the response (customize for your Spice)
        if (!api_result || !api_result.solution) {
            return Spice.failed('symbolab');
        }

        DDG.require('mathquill', function (){
            Spice.add({
                id: "symbolab",
                name: "Calculator",
                data: api_result.solution,
                meta: {
                    sourceName: "Symbolab",
                    sourceUrl: api_result.solution.url
                },
                normalize: function (data) {
                    return {
                        latex: data.presentation
                    };
                },
                templates: {
                    group: 'text',
                    options: {
                        content: Spice.symbolab.content
                    }
                }
            });
        });
    };
}(this));