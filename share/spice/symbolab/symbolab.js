(function (env) {
    "use strict";
    
    function containsLatexChars(str){
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
                name: "Answer",
                data: api_result.solution,
                meta: {
                    sourceName: "symbolab.com",
                    sourceUrl: api_result.solution.url
                },
                normalize: function (data) {
                    return {
                        problem: data.problemLatex,
                        problemHasLatex: containsLatexChars(data.problemLatex),
                        solution: data.solutionLatex,
                        solutionHasLatex: containsLatexChars(data.solutionLatex),
                        rendered: false
                    };
                },
                templates: {
                    group: 'text',
                    options: {
                        title_content: Spice.symbolab.title_content,
                        subtitle_content: Spice.symbolab.subtitle_content,
                        moreText: {
                            text: "Show all steps",
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
