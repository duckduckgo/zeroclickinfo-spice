(function (env) {
    "use strict";
    
    function containsLatexChars(str){
        console.log(str);
        return /[\^\\\_]/.test(str);
    }
    
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
                    sourceName: "Symbolab.com",
                    sourceUrl: api_result.solution.url
                },
                normalize: function (data) {
                    return {
                        latex: data.problemLatex,
                        solution: data.solutionLatex,
                        rendered: false
                    };
                },
                templates: {
                    group: 'text',
                    options: {
                        title_content: containsLatexChars(api_result.solution.solutionLatex) ? Spice.symbolab.title_content : Spice.symbolab.title_content_nolatex,
                        subtitle_content: containsLatexChars(api_result.solution.problemLatex) ? Spice.symbolab.subtitle_content : Spice.symbolab.subtitle_content_nolatex,
                        moreText: {
                            text: "Step by step solution",
                            href: api_result.solution.url
                        }
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
