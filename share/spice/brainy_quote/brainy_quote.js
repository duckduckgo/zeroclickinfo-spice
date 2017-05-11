(function(env) {
    env.ddg_spice_brainy_quote = function(api_result) {

        Handlebars.registerHelper("getAuthor", function (arg1, arg2) {
            if (arg1 == null && arg2 == null) {
                return;
            }
            return arg1 == null ? arg2.replace(/ quote$/, "") : arg1;
        });

        if (!api_result || api_result.error || api_result.author) {
            return Spice.failed('brainy_quote');
        }
	
	if (!DDG.get_query().match(/quotes|quotations/)) {
            Spice.add({
                id: 'brainy_quote',
                name: 'Quotations',
                data: api_result,
                meta: {
                    sourceName: 'Brainy Quote',
                    sourceUrl: api_result.source_url
                },
                signal: 'high',
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
	} else {
            // Construct the original api call
            var script = $('[src*="/js/spice/brainy_quote/"]')[0],
            source = $(script).attr("src"),
            query = source.match(/brainy_quote\/([^\/]+)/)[1];


            // Call the api until we obtain three quotes
            var quotesCounter = 1,
                apiResultsArray = [api_result];

            var jqxhr;
            while (quotesCounter != 3) {
                // TODO: Using secondary endpoint (which is identical to primary 
                // endpoint) to make orignal api call 
                jqxhr = $.getJSON("/js/spice/test_endpoint/" + query, function(data) {
                    // TODO: Only add the quote if it is unique
                    apiResultsArray.push(data);
                })
                .fail(function( jqxhr, textStatus, error ) {
                    var err = textStatus + ", " + error;
                    console.log( "Request Failed: " + err );
                });
                quotesCounter++;
            }

            jqxhr.done(function() {
                var spiceObj = {
                    id: 'brainy_quote',
                    name: 'Quotations',
                    data: {
                        list: apiResultsArray 
                    },
                    meta: {
                        sourceName: 'Brainy Quote',
                        sourceUrl: api_result.source_url
                    },
                    signal: 'high',
                    templates: {
                        group: 'list',
                        options: {
                            list_content: Spice.brainy_quote.list_content,
                            moreAt: true
                        }
                    }
                };
                Spice.add(spiceObj);
            });
        }
    };
}(this));
