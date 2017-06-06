(function(env) {

    env.ddg_spice_brainy_quote = function(api_result) {

        if (!api_result || api_result.error || api_result.author) {
            return Spice.failed('brainy_quote');
        }

        var authors = {},
            title;

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

            // Determine if we have multiple authors
            $.each(apiResultsArray, function (k, obj) {
                if (obj.a) {
                    authors[obj.a] = 1;
                }
            });

            console.log(authors);
            var title = "";

            if (authors.length > 1){
                title = "Quotes about " + api_result.header1.replace(/ quote$/, "");
            } else {
                title = "Quotes by " + api_result.header1.replace(/ quote$/, "");
            }

            Spice.add({
                id: 'brainy_quote',
                name: 'Quotations',
                meta: {
                    sourceName: 'Brainy Quote',
                    sourceUrl: api_result.source_url
                },
                data: {
                    title: title,
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
        });
    };
}(this));
