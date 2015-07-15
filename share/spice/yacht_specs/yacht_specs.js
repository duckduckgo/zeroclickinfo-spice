(function (env) {
    "use strict";
    env.ddg_spice_yacht_specs = function(api_result){

        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error) {
            return Spice.failed('yacht_specs');
        }

        // Render the response
        Spice.add({
            id: "yacht_specs",

            // Customize these properties
            name: "Yacht Info",
            data: api_result,
            meta: {
                sourceName: "YachtHarbour",
                sourceUrl: 'http://yachtharbour.com' + api_result.link
            },
              normalize: function(data) {
                return {
                  image: data.result_photo,
                  title: data.name,
                  subtitle: "Built by " + data.yard,
                    record_data: {
                        "Length": data.length + "m",
                        "Beam": data.beam + "m",
                        "Year Built": data.year,
                        "Max Speed": data.Mspeed + " knots"
                       }
                };
              },
            templates: {
                group: 'info',
                options: {
                    content: 'record',
                    moreAt: true
                }
            }
        });
    };
}(this));
