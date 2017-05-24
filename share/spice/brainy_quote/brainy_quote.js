(function(env) {
    env.ddg_spice_brainy_quote = function(api_result) {

        Handlebars.registerHelper("getAuthor", function (arg1, arg2) {
            if (arg2 === undefined) {
                return;
            }

            return arg1 || arg2.replace(/ quote$/, "");
        });

        if (!api_result || api_result.error || api_result.author) {
            return Spice.failed('brainy_quote');
        }

        var spiceObj = {
            id: 'brainy_quote',
            name: 'Quotations',
            meta: {
                sourceName: 'Brainy Quote',
                sourceUrl: api_result.source_url
            },
            signal: 'high',
        };
        
        if (!DDG.get_query().match(/quotes|quotations/)) {
            $.extend(spiceObj, {
                data: api_result,
                normalize: function(item) {
                    return {
                        person: item.header1.replace(/ quote$/, ""),
                        url: item.source_url
                    };
                },
                templates: {
                    group: 'base',
                    options: {
                        content: Spice.brainy_quote.content,
                        moreAt: true
                    }
                }
            });
            Spice.add(spiceObj);
        } else {
            // Construct the original api call
            var script = $('[src*="/js/spice/brainy_quote/"]')[0],
            source = $(script).attr("src"),
            query = source.match(/brainy_quote\/([^\/]+)/)[1];


            // Call the api twice more to obtain three quotes
            var apiResultsArray = [api_result];

            var endpoint = "/js/spice/fetch_brainy_quote/" + query; 
            $.when($.getJSON(endpoint), $.getJSON(endpoint)).done(function(result1, result2) {
                // TODO: Check for quote uniqueness
                apiResultsArray.push(result1[0], result2[0]);

                $.extend(spiceObj, {
                    data: {
                        list: apiResultsArray
                    },
                    templates: {
                        group: 'list',
                        options: {
                            list_content: Spice.brainy_quote.list_content,
                            moreAt: true
                        }
                    }
                });
                Spice.add(spiceObj);
            });
        }
    };
}(this));
