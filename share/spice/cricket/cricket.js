(function (env) {
    "use strict";
    env.ddg_spice_cricket = function(api_result) {

        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error) {
            return Spice.failed('cricket');
        }

        // Render the response
        Spice.add({
            id: "cricket",

            // Customize these properties
            name: "Cricket",
            data: api_result.query.results.Series[0].SeriesName,
            meta: {
                sourceName: "developer.yahoo.com",
                sourceUrl: 'http://example.com/url/to/details/' + api_result.name
            },
            normalize: function(item) {
              var response = api_result.query.results.Series[0];
              var data={
                  // customize as needed for your chosen template
                  name: response.SeriesName,
                  description: "Score & Schedule",
                  image: item.icon,
                  matches:[]
              };
              for(var match in response.Schedule.Match){
                data.matches.push(response.Schedule.Match[match]);
              }
                return data;
            },
            templates: {
                group: 'text',
                options: {
                    content: Spice.cricket.content,
                    moreAt: true
                }
            }
        });
    };
}(this));
