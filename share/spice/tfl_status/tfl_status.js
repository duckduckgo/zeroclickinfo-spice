(function (env) {
    "use strict";
    env.ddg_spice_tfl_status = function(api_result){
        
    if (!api_result) {
        return Spice.failed('tfl_status');
    }
        
    var title = api_result[0].lineStatuses[0].statusSeverityDescription + " on the " + api_result[0].name + " line.",
        subtitle = api_result[0].lineStatuses[0].reason,
        sourceUrl = 'http://tfl.gov.uk/tube-dlr-overground/status/#line-' + api_result[0].id;
        
        Spice.add({
            id: "tfl_status",
            name: "Travel",
            data: api_result,
            meta: {
                sourceName: "tfl.gov.uk",
                sourceUrl: sourceUrl
            },
            normalize: function(item) {
                return {
                    title: title,
                    subtitle: subtitle
                };
            },
            templates: {
                group: 'text',
                options: {
                    moreAt: true
                }
            }
        });
    };
}(this));
