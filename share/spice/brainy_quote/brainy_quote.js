(function(env) {
    env.ddg_spice_brainy_quote = function(api_result) {

        //function callAPIAndAddAnotherQuoteToTheView(

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
            // Write retrival logic to make multiple calls to api
            // and display results in a list

            // Construct the original api call
            var script = $('[src*="/js/spice/brainy_quote/"]')[0],
            source = $(script).attr("src"),
            query = source.match(/brainy_quote\/([^\/]+)/)[1]

            /*
            $.getJSON("/js/spice/brainy_quote/" + query, function(data) {
                console.log(data)
            })
            */

            var threeUniqueQuotesCounter = 1,
                arrayOfApiResults = [api_result]

            var jqxhr;
            while (threeUniqueQuotesCounter != 3) {
                // TEMP: Unsure how to access default so endpoint, 
                // using this second endpoint to make api call
                jqxhr = $.getJSON("/js/spice/test_endpoint/" + query, function(data) {
                    //if ($.inArray(data.q)) {
                     //   break
                    //}
                    arrayOfApiResults.push(data)
                })
                .fail(function( jqxhr, textStatus, error ) {
                    var err = textStatus + ", " + error;
                    console.log( "Request Failed: " + err );
                });
                threeUniqueQuotesCounter++
            }

            jqxhr.done(function() {
                console.log("arrayOfApiResults: " + JSON.stringify(arrayOfApiResults));

                var spiceObj = {
                    id: 'brainy_quote',
                    name: 'Quotations',
                    data: {
                        list:  arrayOfApiResults 
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
