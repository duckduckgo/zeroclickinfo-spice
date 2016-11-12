(function (env) {
    "use strict";

    env.ddg_spice_imdb_movies = function(api_result) {

        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error) {
            return Spice.failed('imdb_movies');
        }

        // Render the response
        Spice.add({
            id: 'imdb_movies',

            // Customize these properties
            name: 'AnswerBar title',
            data: api_result,
            meta: {
                sourceName: 'Example.com',
                sourceUrl: 'http://example.com/url/to/details/' + api_result.name
            },
            normalize: function(item) {
                return {
                    // customize as needed for your chosen template
                    title: item.title,
                    subtitle: item.subtitle,
                    image: item.icon
                };
            },
            templates: {
                group: 'your-template-group',
                options: {
                    content: Spice.imdb_movies.content,
                    moreAt: true
                }
            }
        });
    };
}(this));
