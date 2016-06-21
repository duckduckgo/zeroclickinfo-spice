(function(env) {
    "use strict";

    // No need for api results: data is hardcoded for this test
    env.ddg_spice_meta = function(result) {

        /*if (!api_result || !api_result.items) {
            return Spice.failed('meta');
        }*/

        var perl_ias = [
            {
                name: "PerlDoc",
                desc: "Perl reference",
                example_query: "https://duckduckgo.com/?q=perl%20split&ia=about"
            },
            {
                name: "Perl6Doc",
                desc: "Perl 6 reference",
                example_query: "https://duckduckgo.com/?q=perl%206%20str"
            },
            {
                name: "MetaCPAN",
                desc: "Searches CPAN modules",
                example_query: "https://duckduckgo.com/?q=metacpan%20WWW%3A%3ADuckDuckGo&ia=software"
            },
            {
                name: "Perl Cheat Sheet",
                desc: "Cheat Sheet for the Perl language",
                example_query: "https://duckduckgo.com/?q=Perl%20Cheat%20Sheet&ia=answer"
            },
            {
                name: "Perldoc Cheat Sheet",
                desc: "Shows command line usage for the perldoc, Perl Documentation command line interface ",
                example_query: "https://duckduckgo.com/?q=perldoc%20cheat%20sheet&ia=answer"
            }
        ];

        Spice.add({
            id: 'meta',
            name: 'Meta IA',
            data: perl_ias,
            meta: {
                searchTerm: DDG.get_query(),
                itemType: 'Perl IAs',
                sourceUrl: 'https://duck.co/ia',
                sourceName: 'IA Pages'
            },
            normalize: function(item) {
                return {
                    title: item.name,
                    subtitle: item.desc,
                    url: item.example_query
                };
            },
            templates: {
                group: 'text',
                detail: false,
                options: {
                },
                variants: {
                    tileSnippet: "large"
                }
            }
        });
    };

}(this)); 
