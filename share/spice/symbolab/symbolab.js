(function (env) {
    "use strict";
    env.ddg_spice_symbolab = function (api_result) {

        // Validate the response (customize for your Spice)
        if (!api_result || !api_result.solution) {
            return Spice.failed('symbolab');
        }

        DDG.require('mathquill', function (){
            console.log(api_result);
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
                        //title: "Solution for: " + data.problemLatex,
                        latex: data.presentationLatex,
                        rendered: false
                    };
                },
                templates: {
                    group: 'text',
                    options: {
                        content: Spice.symbolab.content
                    }
                },
                onItemShown: function(item) {
                    if (item.rendered) {
                        return;
                    }
                    var container = Spice.getDOM('symbolab');
                    $(container).find(".mathquill-embedded-latex").mathquill();
                    item.set({rendered: true});
                }
            });
        });
    };
}(this));
