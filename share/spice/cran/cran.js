(function (env) {
    "use strict";
    env.ddg_spice_cran = function(api_result) {

        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error) {
            return Spice.failed('cran');
        }

        // Render the response
        Spice.add({
            id: "cran",

            // Customize these properties
            name: "Software", //I think "Packages" would be more appropriate, but this is fine as well
            data: {
                title: api_result.Package,
                subtitle: api_result.Description,
                record_data: api_result,
                record_keys: ['Author', 'Version', 'URL', 'Date/Publication', 'License', 'NeedsCompilation']
            },
            meta: {
                sourceName: "METACRAN",
                sourceUrl: 'http://r-pkg.org/pkg/' + api_result.Package
            },
            normalize: function(item) {
                return {
                    // customize as needed for your chosen template
                };
            },
            templates: {
                group: 'list',
                options: {
                    content: 'record',
                    moreAt: true
                }
            }
        });
    };
}(this));
