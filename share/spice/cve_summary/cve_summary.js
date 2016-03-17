(function (env) {
    "use strict";
    env.ddg_spice_cve_summary = function(api_result){

        // Validate the response (customize for your Spice)
        if (api_result.error) {
            return Spice.failed('cve_summary');
        }

        // Render the response
        Spice.add({
            id: "cve_summary",

            // Customize these properties
            name: "CVE Summary",
            data: api_result,
            meta: {
                sourceName: "cve.circl.lu",
                sourceUrl: 'http://cve.circl.lu/cve/' + api_result.id
            },
            templates: {
                group: 'text',
                options: {
                    content: Spice.cve_summary.content,
                    moreAt: true
                }
            },
            normalize: function(item) {
                return {
                    title: api_result.id,
                    description: api_result.summary
                };
            }
        });
    };
}(this));
